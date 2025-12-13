'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileText, Plus, Trash2, Edit, Loader2, Search } from 'lucide-react';
import { getPosts, createPost, deletePost } from '@/actions/post-actions';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Type inference
type Post = {
    id: string;
    title: string;
    status: string;
    author: { name: string | null; email: string | null };
    createdAt: Date;
};

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [iscreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('DRAFT');

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await getPosts();
            setPosts(data as unknown as Post[]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('status', status);

        await createPost(formData);
        setIsCreateModalOpen(false);
        setTitle('');
        setContent('');
        fetchPosts();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this post?')) {
            await deletePost(id);
            fetchPosts();
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold font-display text-primary">Content Management</h1>
                    <p className="text-muted-foreground mt-1">Curate insights and news for your investors.</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" /> New Post
                </Button>
            </div>

            {/* Search / Filter Bar Placeholder */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search posts..." className="pl-10 bg-white" />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-accent" />
                </div>
            ) : (
                <div className="grid gap-6">
                    {posts.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            No posts found. Start writing today.
                        </div>
                    ) : (
                        posts.map((post) => (
                            <Card key={post.id} className="group hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-accent">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-semibold text-lg text-primary">{post.title}</h3>
                                            <span className={cn(
                                                "px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold",
                                                post.status === 'PUBLISHED'
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-amber-100 text-amber-700"
                                            )}>
                                                {post.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            By <span className="text-primary font-medium">{post.author?.name || 'Admin'}</span> • {new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Edit className="w-4 h-4 text-gray-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600" onClick={() => handleDelete(post.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}

            {/* Create Modal */}
            <AnimatePresence>
                {iscreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setIsCreateModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-background w-full max-w-lg rounded-xl shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="p-6 border-b bg-secondary/30">
                                <h2 className="text-xl font-bold font-display">Create New Post</h2>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleCreate} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Title</label>
                                        <Input value={title} onChange={e => setTitle(e.target.value)} required placeholder="Market Update - Q3 2025" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Content / Summary</label>
                                        <textarea
                                            value={content}
                                            onChange={e => setContent(e.target.value)}
                                            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Status</label>
                                        <select
                                            value={status}
                                            onChange={e => setStatus(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="DRAFT">Draft</option>
                                            <option value="PUBLISHED">Published</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                                        <Button type="submit" className="bg-primary text-primary-foreground">Create Draft</Button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';
import { getContent, updateContent } from '@/actions/content-actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContentPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Content State
    const [aboutContent, setAboutContent] = useState('');
    const [contactContent, setContactContent] = useState('');

    useEffect(() => {
        const loadContent = async () => {
            setLoading(true);
            try {
                const [about, contact] = await Promise.all([
                    getContent('about_us'),
                    getContent('contact_us')
                ]);
                setAboutContent(about);
                setContactContent(contact);
            } catch (error) {
                console.error("Failed to load content", error);
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, []);

    const handleSave = async (key: string, content: string) => {
        setSaving(true);
        try {
            await updateContent(key, content);
            alert('Content saved successfully!');
        } catch (error) {
            alert('Failed to save content.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold font-display text-primary">Site Content</h1>
                <p className="text-muted-foreground mt-1">Manage content for About Us and Contact pages.</p>
            </div>

            <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="about">About Us</TabsTrigger>
                    <TabsTrigger value="contact">Contact Us</TabsTrigger>
                </TabsList>

                {/* About Us Tab */}
                <TabsContent value="about" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Us Page Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <textarea
                                value={aboutContent}
                                onChange={(e) => setAboutContent(e.target.value)}
                                className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter content for the About Us page..."
                            />
                            <div className="flex justify-end">
                                <Button onClick={() => handleSave('about_us', aboutContent)} disabled={saving}>
                                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Contact Us Tab */}
                <TabsContent value="contact" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Us Page Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <textarea
                                value={contactContent}
                                onChange={(e) => setContactContent(e.target.value)}
                                className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter content for the Contact Us page (Address, Phone, Email, etc.)..."
                            />
                            <div className="flex justify-end">
                                <Button onClick={() => handleSave('contact_us', contactContent)} disabled={saving}>
                                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

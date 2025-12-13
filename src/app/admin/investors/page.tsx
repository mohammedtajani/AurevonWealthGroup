"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import { getInvestors, createInvestor, deleteInvestor } from '@/actions/investor-actions';
import { cn } from '@/lib/utils';
// Types should come from Prisma Client or a shared type definition. 
// For now, let's infer or define locally matching the Prisma model.
type Investor = {
    id: string;
    name: string;
    email: string;
    status: string;
    investmentValue: string | null;
};

export default function InvestorsPage() {
    const [investors, setInvestors] = useState<Investor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [value, setValue] = useState('');

    const fetchInvestors = async () => {
        setLoading(true);
        try {
            const data = await getInvestors();
            // Ensure status strings match if needed, but for now assuming Prisma return is compatible
            setInvestors(data as unknown as Investor[]);
        } catch (error) {
            console.error("Failed to fetch investors", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestors();
    }, []);

    const handleAddInvestor = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('investmentValue', value);
        formData.append('status', 'Pending');

        try {
            await createInvestor(formData);
            setIsModalOpen(false);
            setName('');
            setEmail('');
            setValue('');
            fetchInvestors();
        } catch (error) {
            console.error("Failed to add investor", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this investor?')) {
            await deleteInvestor(id);
            fetchInvestors();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display text-primary">Investors</h1>
                    <p className="text-muted-foreground">Manage client portfolios and access.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Add Investor
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Client List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Email</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Value (₹)</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {investors.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-4 text-center text-muted-foreground">No investors found.</td>
                                        </tr>
                                    ) : (
                                        investors.map((investor) => (
                                            <tr key={investor.id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 align-middle font-medium">{investor.name}</td>
                                                <td className="p-4 align-middle">{investor.email}</td>
                                                <td className="p-4 align-middle">
                                                    <span className={cn(
                                                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                                                        investor.status === 'Active'
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : "bg-amber-50 text-amber-700 border-amber-200"
                                                    )}>
                                                        {investor.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle text-right">{investor.investmentValue}</td>
                                                <td className="p-4 align-middle text-right">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => investor.id && handleDelete(investor.id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Simple Modal overlay for Adding Investor */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <Card className="w-full max-w-md mx-4">
                        <CardHeader>
                            <CardTitle>Add New Investor</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddInvestor} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input value={name} onChange={e => setName(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Investment Value</label>
                                    <Input value={value} onChange={e => setValue(e.target.value)} placeholder="e.g. 50,00,000" required />
                                </div>
                                <div className="flex gap-2 justify-end pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit">Save Investor</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

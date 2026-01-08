"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { getInvestors, createInvestor, deleteInvestor } from '@/actions/investor-actions';
import { approveInvestor, rejectInvestor } from '@/actions/investor-workflow';
import { cn } from '@/lib/utils';

type Investor = {
    id: string;
    name: string;
    email: string;
    status: string;
    investmentValue: string | null;
    createdAt: Date;
};

export default function InvestorsPage() {
    const [investors, setInvestors] = useState<Investor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [value, setValue] = useState('');

    const fetchInvestors = async () => {
        setLoading(true);
        try {
            const data = await getInvestors();
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

    const handleApprove = async (id: string) => {
        setProcessingId(id);
        const result = await approveInvestor(id);
        if (result.success) {
            alert(`Investor Approved!\nPassword: ${result.password}\n(This password has been 'emailed' to them)`);
            fetchInvestors();
        } else {
            alert(`Error: ${result.error}`);
        }
        setProcessingId(null);
    };

    const handleReject = async (id: string) => {
        if (!confirm('Reject this investor?')) return;
        setProcessingId(id);
        const result = await rejectInvestor(id);
        if (result.success) {
            fetchInvestors();
        } else {
            alert("Failed to reject");
        }
        setProcessingId(null);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this investor record permanently?')) {
            await deleteInvestor(id);
            fetchInvestors();
        }
    };

    const pendingInvestors = investors.filter(i => i.status === 'Pending');
    const activeInvestors = investors.filter(i => i.status === 'Active');
    const rejectedInvestors = investors.filter(i => i.status === 'Rejected');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display text-primary">Investors</h1>
                    <p className="text-muted-foreground">Manage client access and approval workflow.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" /> Add Investor
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <Tabs defaultValue="pending" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
                        <TabsTrigger value="pending">Pending ({pendingInvestors.length})</TabsTrigger>
                        <TabsTrigger value="active">Active ({activeInvestors.length})</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected ({rejectedInvestors.length})</TabsTrigger>
                    </TabsList>

                    {/* Pending Tab */}
                    <TabsContent value="pending" className="mt-4">
                        <Card>
                            <CardHeader><CardTitle>Pending Approvals</CardTitle></CardHeader>
                            <CardContent>
                                <InvestorTable
                                    data={pendingInvestors}
                                    actions={(inv) => (
                                        <div className="flex gap-2 justify-end">
                                            <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700 text-white"
                                                onClick={() => handleApprove(inv.id)}
                                                disabled={processingId === inv.id}
                                            >
                                                {processingId === inv.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-1" />}
                                                Approve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-red-600 border-red-200 hover:bg-red-50"
                                                onClick={() => handleReject(inv.id)}
                                                disabled={processingId === inv.id}
                                            >
                                                <XCircle className="w-4 h-4 mr-1" />
                                                Reject
                                            </Button>
                                        </div>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Active Tab */}
                    <TabsContent value="active" className="mt-4">
                        <Card>
                            <CardHeader><CardTitle>Active Clients</CardTitle></CardHeader>
                            <CardContent>
                                <InvestorTable
                                    data={activeInvestors}
                                    actions={(inv) => (
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(inv.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Rejected Tab */}
                    <TabsContent value="rejected" className="mt-4">
                        <Card>
                            <CardHeader><CardTitle>Rejected Requests</CardTitle></CardHeader>
                            <CardContent>
                                <InvestorTable
                                    data={rejectedInvestors}
                                    actions={(inv) => (
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(inv.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <Card className="w-full max-w-md mx-4 animate-in zoom-in-95">
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
                                    <Button type="submit" className="bg-primary text-primary-foreground">Save Investor</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

// Sub-component for clean table
function InvestorTable({ data, actions }: { data: Investor[], actions: (inv: Investor) => React.ReactNode }) {
    if (data.length === 0) {
        return <div className="text-center py-8 text-muted-foreground">No records found.</div>;
    }
    return (
        <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
                <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Email</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Value (₹)</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                    {data.map((investor) => (
                        <tr key={investor.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{investor.name}</td>
                            <td className="p-4 align-middle">{investor.email}</td>
                            <td className="p-4 align-middle">
                                <span className={cn(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                                    investor.status === 'Active' ? "bg-green-50 text-green-700 border-green-200" :
                                        investor.status === 'Rejected' ? "bg-red-50 text-red-700 border-red-200" :
                                            "bg-amber-50 text-amber-700 border-amber-200"
                                )}>
                                    {investor.status}
                                </span>
                            </td>
                            <td className="p-4 align-middle text-right">{investor.investmentValue}</td>
                            <td className="p-4 align-middle text-right">
                                {actions(investor)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

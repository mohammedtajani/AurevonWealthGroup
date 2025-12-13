'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Bell, Shield, Globe } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function SettingsPage() {
    const { data: session } = useSession();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold font-display text-primary">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account and platform preferences.</p>
            </div>

            <div className="grid gap-6">
                {/* Profile Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-accent" />
                            <CardTitle>Profile Information</CardTitle>
                        </div>
                        <CardDescription>Update your personal details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input defaultValue={session?.user?.name || 'Admin User'} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input defaultValue={session?.user?.email || ''} disabled className="bg-muted" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button variant="outline" disabled>Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-accent" />
                            <CardTitle>Security</CardTitle>
                        </div>
                        <CardDescription>Manage password and authentication methods.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/10">
                            <div>
                                <h4 className="font-medium text-primary">Two-Factor Authentication</h4>
                                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                            </div>
                            <Button variant="outline" size="sm">Enable</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/10">
                            <div>
                                <h4 className="font-medium text-primary">Password</h4>
                                <p className="text-sm text-muted-foreground">Last changed 3 months ago.</p>
                            </div>
                            <Button variant="outline" size="sm">Change Password</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-accent" />
                            <CardTitle>Notifications</CardTitle>
                        </div>
                        <CardDescription>Configure how you receive alerts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Email Alerts for New Investors</label>
                                <input type="checkbox" defaultChecked className="toggle-checkbox" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Weekly Performance Digest</label>
                                <input type="checkbox" defaultChecked className="toggle-checkbox" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

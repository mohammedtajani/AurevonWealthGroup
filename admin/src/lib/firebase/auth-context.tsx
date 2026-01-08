"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    devLogin: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
    devLogin: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Only update if we haven't manually set a dev user
            // Actually, onAuthStateChanged fires on init. 
            // If we are in dev mode, we might want to ignore this or handle it.
            // For simplicity, let's just let it run. If we devLogin, we overwrite 'user'.
            if (!user) {
                // If firebase says no user, but we might have a dev user? 
                // Persistence is tricky. Let's just default to firebase.
                // If we want dev login to persist, we'd need local storage.
                // For this simple request, ephemeral in-memory dev login is fine.
                // But onAuthStateChanged might fire and clear it.
            }
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        await firebaseSignOut(auth);
        setUser(null); // Clear manual dev user if any
        router.push('/');
    };

    const devLogin = () => {
        const mockUser = {
            uid: 'dev-admin-123',
            email: 'admin@aurevon.com',
            displayName: 'Dev Admin',
            emailVerified: true,
        } as unknown as User;
        setUser(mockUser);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut, devLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

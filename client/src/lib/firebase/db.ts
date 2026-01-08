import { db } from './client';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, Timestamp } from 'firebase/firestore';

export interface Investor {
    id?: string;
    name: string;
    email: string;
    status: 'Active' | 'Pending' | 'Inactive';
    investmentValue: string;
    createdAt: Timestamp;
}

const COLLECTION_NAME = 'investors';

export const addInvestor = async (investor: Omit<Investor, 'id' | 'createdAt'>) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
        ...investor,
        createdAt: Timestamp.now(),
    });
};

export const getInvestors = async (): Promise<Investor[]> => {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Investor));
};

export const deleteInvestor = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
};

export const updateInvestor = async (id: string, data: Partial<Investor>) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
};

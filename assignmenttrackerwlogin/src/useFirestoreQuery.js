import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const useFirestoreQuery = (collectionName) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, collectionName), orderBy("dueDate"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const assignments = [];
            querySnapshot.forEach((doc) => {
                assignments.push({ id: doc.id, ...doc.data() });
            });
            setData(assignments);
            setIsPending(false);
        }, (error) => {
            setError(error);
            setIsPending(false);
        });

        return () => unsubscribe();
    }, [collectionName]);

    return { data, isPending, error };
}

export default useFirestoreQuery;

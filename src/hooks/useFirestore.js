import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFireStore = (collection, condition) => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        let collectionRef = db.collection(collection);
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }

            collectionRef = collectionRef.where(condition.fieldValue , condition.operator , condition.compareValue)
        }

        const unsubcribe = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id : doc.id
                }
            })
            setDocuments(documents)
        })

        return unsubcribe
    }, [collection, condition]);

    
    return documents;
}
import { useState, useEffect } from "react"
import { auth, db } from "../../lib/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, getDoc } from "firebase/firestore"

export function useAuth(){
    const [authUser, authLoading, error] = useAuthState(auth)
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const ref = doc(db, "users", authUser.uid)
            const docSnap = await getDoc(ref)
            setUser(docSnap.data())
            setLoading(false)
        }
    
        if (!authLoading) {
            if (authUser) 
                fetchData()
            else 
                setLoading(false) // Not signed in
        }
    }, [authLoading]);

    return { user, isLoading, error };
}
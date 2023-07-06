import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, doc, query, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore"

import { db, storage } from "../../lib/firebase"

export function useUser(id) {
    const q = query(doc(db, "users", id))
    const [user, isLoading] = useDocumentData(q)
    return { user, isLoading }
}

export function useUsers() {
    const [users, isLoading] = useCollectionData(collection(db, "users"))
    return { users, isLoading }
}

export function useUpdateAvatar(uid) {
    const [isLoading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    async function updateAvatar() {
        if (!file) {
            console.log("didnt work")
            return
        }

        setLoading(true)

        const fileRef = ref(storage, "avatars/" + uid)
        await uploadBytes(fileRef, file)

        const avatarURL = await getDownloadURL(fileRef)

        const docRef = doc(db, "users", uid)
        await updateDoc(docRef, { avatar: avatarURL })

        setLoading(false)

        navigate(0)
    }

    return {
        setFile,
        updateAvatar,
        isLoading,
        fileURL: file && URL.createObjectURL(file),
    }
}
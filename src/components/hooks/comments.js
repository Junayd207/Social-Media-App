import { useState } from "react"
import { uuidv4 } from "@firebase/util"
import {
    collection,
    deleteDoc,
    doc,
    orderBy,
    query,
    setDoc,
    where,
} from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"

import { db } from "../../lib/firebase"

export function useAddComment({ postID, uid }) {
    const [isLoading, setLoading] = useState(false);

    async function addComment(text) {
        if(!text.length) return

        setLoading(true)
        const id = uuidv4()
        const date = Date.now()
        const docRef = doc(db, "comments", id)
        await setDoc(docRef, { text, id, postID, date, uid })
        setLoading(false);
    }

    return { addComment, isLoading }
}

export function useComments(postID) {
    const q = query(
        collection(db, "comments"),
        where("postID", "==", postID),
        orderBy("date", "desc")
    )
    const [comments, isLoading, error] = useCollectionData(q)
    if (error) throw error

    return { comments, isLoading }
}

export function useDeleteComment(id) {
    const [isLoading, setLoading] = useState(false)

    async function deleteComment() {
        const res = window.confirm("Are you sure you want to delete this comment?")

        if (res) {
            setLoading(true)
            const docRef = doc(db, "comments", id)
            await deleteDoc(docRef)
            setLoading(false)
        }
    }

    return { deleteComment, isLoading }
}
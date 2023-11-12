import { collection, getDocs, documentId, limit, orderBy, query, where } from "firebase/firestore"; 
import { db } from "./firebase";

const gptsRef = collection(db, "gpts");

export async function getGpt(id) {
    const q = query(gptsRef, where(documentId(), "==", `${id}`))
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data()
}

export async function getGptsWithMostUpvotes(lim) {
    const q = query(gptsRef, orderBy("upvote_count"), limit(lim))
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data()
}
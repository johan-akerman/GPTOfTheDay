import { collection, getDocs, documentId, limit, orderBy, query, where, setDoc, doc, addDoc } from "firebase/firestore"; 
import { db } from "./firebase";

const gptsRef = collection(db, "gpts");

export async function getGpt(id) {
    const q = query(gptsRef, where(documentId(), "==", `${id}`))
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data()
}

// export async function getGptsWithMostUpvotes(lim) {
//     const q = query(gptsRef, orderBy("upvote_count", "desc"), limit(lim))
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.empty ? null : querySnapshot.docs.map(doc => doc.data())
// }

// export async function getGptsWithMostUpvotesToday(lim) {
//     const sfTimeZone = "America/Los_Angeles";
//     const sfTime = new Date().toLocaleString("en-US", {
//         timeZone: sfTimeZone,
//     });
//     const firstSecondOfToday = sfTime.setHours(0,0,0,0).getTime();

//     const q = query(gptsRef, where("submitted_at", ">=", firstSecondOfToday), orderBy("upvote_count"), limit(lim))
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.empty ? null : querySnapshot.docs.map(doc => doc.data())
// }

// export async function getGptsWithLeastUpvotes(lim) {
//     const q = query(gptsRef, orderBy("upvote_count", "asc"), limit(lim))
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.empty ? null : querySnapshot.docs.map(doc => doc.data())
// }

// export async function getGptsWithCategory(category) {
//     const q = query(gptsRef, where("category", "==", category), limit(10))
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.empty ? null : querySnapshot.docs.map(doc => doc.data())
// }

// export async function getGptsNewest(lim) {
//     const q = query(gptsRef, orderBy("submitted_at", "desc"), limit(lim))
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.empty ? null : querySnapshot.docs.map(doc => doc.data())
// }

// export async function getGptsOldest(lim) {
//     const q = query(gptsRef, orderBy("submitted_at", "asc"), limit(lim))
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.empty ? null : querySnapshot.docs.map(doc => doc.data())
// }

export async function getGptsWithFilter(where_property, where_operator, where_value, order_value, order_order = "desc", lim = 10) {
    if (where_property === null || where_operator === null || where_value === null) {
        const q = query(gptsRef, orderBy(where_property, order_order), limit(lim))
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty ? null : querySnapshot.docs.map(doc => doc.data())
    }
    const q = query(gptsRef, where(where_property, where_operator, where_value), orderBy(order_value || where_property, order_order), limit(lim))
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs.map(doc => doc.data())
}

// export async function getMoreGpts() {

// }

export async function addGptRequest(gpt) {
    const docRef = await addDoc(collection(db, "gpt_requests"), gpt)
    return docRef
}
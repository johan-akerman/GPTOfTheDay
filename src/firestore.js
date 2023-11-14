import {
  collection,
  getDocs,
  documentId,
  limit,
  orderBy,
  query,
  where,
  setDoc,
  doc,
  addDoc,
  startAt,
} from "firebase/firestore";
import { db } from "./firebase";

let latestFilter = {};

const gptsRef = collection(db, "gpts");

export async function getGpt(id) {
  const q = query(gptsRef, where(documentId(), "==", `${id}`));
  const querySnapshot = await getDocs(q);
  //   return querySnapshot.empty ? null : querySnapshot.docs[0].data();
  return querySnapshot.empty
    ? null
    : querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
}

export async function getGptsWithFilter(
  where_property,
  where_operator,
  where_value,
  order_value,
  order_order = "desc",
  lim = 10
) {
  latestFilter = {
    where_property: where_property,
    where_operator: where_operator,
    where_value: where_value,
    order_value: order_value,
    order_order: order_order,
    lim: lim,
  };
  if (
    where_property === null ||
    where_operator === null ||
    where_value === null
  ) {
    const q = query(
      gptsRef,
      orderBy(order_value || where_property, order_order),
      limit(lim)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.empty
      ? null
      : querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
  }
  const q = query(
    gptsRef,
    where(where_property, where_operator, where_value),
    orderBy(order_value || where_property, order_order),
    limit(lim)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty
    ? null
    : querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
}

export async function getMoreGpts(i) {
  if (
    latestFilter.where_property === null ||
    latestFilter.where_operator === null ||
    latestFilter.where_value === null
  ) {
    const q = query(
      gptsRef,
      orderBy(
        latestFilter.order_value || latestFilter.where_property,
        latestFilter.order_order
      ),
      limit(latestFilter.lim)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty
      ? null
      : querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
  }
  const q = query(
    gptsRef,
    where(
      latestFilter.where_property,
      latestFilter.where_operator,
      latestFilter.where_value
    ),
    orderBy(
      latestFilter.order_value || latestFilter.where_property,
      latestFilter.order_order
    ),
    startAt(latestFilter.lim * i),
    limit(latestFilter.lim)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty
    ? null
    : querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
}

export async function addGptRequest(gpt) {
  const docRef = await addDoc(collection(db, "gpt_requests"), gpt);
  createGptFromRequest(gpt.title);
  return docRef;
}

export async function createGptFromRequest(title) {
  const sfTimeZone = "America/Los_Angeles";
  const sfTime = new Date().toLocaleString("en-US", {
    timeZone: sfTimeZone,
  });
  const gptReqRef = collection(db, "gpt_requests");
  const q = query(gptReqRef, where("title", "==", title));
  const querySnapshot = await getDocs(q);
  const gpt = {
    ...querySnapshot.docs[0].data(),
    upvotes: [],
    comments: [],
    publishedAt: sfTime,
    upvote_count: 0,
  };
  const docRef = await addDoc(gptsRef, gpt);
  console.log(docRef.id);
  return docRef.id;
}

export async function upvoteGpt(title) {}

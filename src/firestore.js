import {
  collection,
  getDocs,
  documentId,
  limit,
  orderBy,
  query,
  where,
  addDoc,
  startAfter,
  updateDoc,
  doc,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "./firebase";

let latestFilter = {};
let latestDoc = {};
let latestDocHottest = {};
let latestDocRecent = {};

const gptsRef = collection(db, "gpts");

export async function getGpt(id) {
  const q = query(gptsRef, where(documentId(), "==", `${id}`));
  const querySnapshot = await getDocs(q);
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
  console.log("latestFilter: ", latestFilter);
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
    console.log(querySnapshot);
    latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    console.log("Latest doc: ", latestDoc);

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
  console.log(querySnapshot);

  latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  console.log("Latest doc: ", latestDoc);

  return querySnapshot.empty
    ? null
    : querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
}

export async function getMoreGpts(i, filter = latestFilter) {
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
      startAfter(latestDoc),
      limit(latestFilter.lim)
    );
    const querySnapshot = await getDocs(q);
    latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return querySnapshot.empty
      ? null
      : querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
  }
  console.log("Started at :", latestFilter.lim * i);
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
    startAfter(latestDoc),
    limit(latestFilter.lim)
  );
  const querySnapshot = await getDocs(q);
  latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return querySnapshot.empty
    ? null
    : querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
}

export async function getMoreHottest() {
  const q = query(
    gptsRef,
    orderBy("upvote", latestFilter.order_order),
    startAfter(latestDoc),
    limit(latestFilter.lim)
  );
  const querySnapshot = await getDocs(q);
  latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

  return querySnapshot.empty
    ? null
    : querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
}

export async function getMoreRecent() {}

export async function submitGpt(gpt) {
  const docRef = await addDoc(collection(db, "gpts"), gpt);
  return docRef;
}

export async function toggleUpvoteGpt(gpt, uid) {
  const sfTime = new Date(
        new Date().toLocaleString("en-US", {
          timeZone: "America/Los_Angeles",
        })
      );

  const docRef = await doc(db, "gpts", gpt.id);

  let hasUserUpvoted = userHasUpvoted(gpt.data.upvotes, uid);
  console.log(hasUserUpvoted);
  console.log(gpt.data.upvotes);

  if (hasUserUpvoted) {
    console.log(gpt.data.upvotes);
    const remove_index = gpt.data.upvotes.findIndex((obj) => obj.uid === uid);

    console.log(gpt.data.upvotes);
    const new_upvotes = gpt.data.upvotes.splice(remove_index, 1);
    console.log(new_upvotes);

    updateDoc(docRef, {
      upvote_count: new_upvotes.length,
      upvotes: new_upvotes,
    });

    console.log("Downvoted ", new_upvotes);

    return new_upvotes;
  } else {
    const new_upvotes = [
      ...gpt.data.upvotes,
      {
        submittedAt: sfTime,
        uid: uid,
      },
    ];
    updateDoc(docRef, {
      upvote_count: new_upvotes.length,
      upvotes: new_upvotes,
    });
    console.log("Upvoted ", gpt.data.title);

    return new_upvotes;
  }
}

export async function upvote(gpt, previousUpvotes, uid) {
  const sfTime = new Date(
        new Date().toLocaleString("en-US", {
          timeZone: "America/Los_Angeles",
        })
      );

  console.log("Starting upvote...");

  let new_upvotes = [
    ...previousUpvotes,
    {
      submittedAt: sfTime,
      uid: uid,
    },
  ];

  console.log("upvotes after: ", new_upvotes);

  const docRef = await doc(db, "gpts", gpt.id);

  return updateDoc(docRef, {
    upvote_count: new_upvotes.length,
    upvotes: new_upvotes,
  })
    .then(console.log("Voted on: ", gpt.id))
    .then(() => {
      return new_upvotes;
    });
}

export async function downvote(gpt, previousUpvotes, uid) {
  console.log("Starting downvote...");

  const remove_index = previousUpvotes.findIndex((obj) => obj.uid === uid);
  console.log("index to remove: ", remove_index);

  let new_upvotes = previousUpvotes.filter(
    (element, index) => index !== remove_index
  );
  console.log("upvotes after: ", new_upvotes);

  const docRef = await doc(db, "gpts", gpt.id);

  return updateDoc(docRef, {
    upvote_count: new_upvotes.length,
    upvotes: new_upvotes,
  })
    .then(console.log("Unvoted on: ", gpt.id))
    .then(() => {
      return new_upvotes;
    });
}

export function userHasUpvoted(upvotes, uid) {
  let hasUpvoted = false;

  upvotes.forEach((vote) => {
    if (vote.uid == uid) {
      hasUpvoted = true;
    }
  });

  return hasUpvoted;
}

export async function getUpvotes(gpt) {
  const upvotesRef = collection(db, "upvotes");
  const q = query(upvotesRef, where("gptid", "==", gpt.id));
  const querySnapshot = await getCountFromServer(q);
  console.log("upvotes", querySnapshot.data());
  return querySnapshot.data().count;
}

export async function getUpvotesWithUserId(gpt, uid) {
  const upvotesRef = collection(db, "upvotes");
  const q = query(
    upvotesRef,
    where("gptid", "==", gpt.id),
    where("uid", "==", uid)
  );
  const querySnapshot = await getCountFromServer(q);
  console.log("upvotes", querySnapshot.data());
  return querySnapshot.data().count;
}

// Time är starttiden. Så om du vill ha senaste 24h skickar du in tiden för starten på senaste dagen.
export async function getUpvotesWithTime(gpt, time) {
  const upvotesRef = collection(db, "upvotes");
  const q = query(
    upvotesRef,
    where("gptid", "==", gpt.id),
    where("time", ">=", time)
  );
  const querySnapshot = await getCountFromServer(q);
  console.log("upvotes", querySnapshot.data());
  return querySnapshot.data().count;
}

export async function addUpvote(gpt, uid) {
  const upvotesRef = collection(db, "upvotes");

  const sfTime = new Date(
        new Date().toLocaleString("en-US", {
          timeZone: "America/Los_Angeles",
        })
      );
  const docRef = await addDoc(upvotesRef, {
    gptid: gpt.id,
    uid: uid,
    time: sfTime,
  });
  return docRef;
}

export async function addComment(gid, uid) {}

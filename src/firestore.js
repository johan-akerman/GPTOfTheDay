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
  doc,
  runTransaction,
  Timestamp,
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

export async function getHottest(lim, getMore = false) {
  let mostRecentMidnight = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    })
  );
  mostRecentMidnight.setHours(0, 0, 0, 0);
  const startOfDay = Timestamp.fromDate(mostRecentMidnight);
  let q = "";
  if (getMore) {
    q = query(
      gptsRef,
      where("mostRecentMidnight", "==", startOfDay),
      orderBy("upvote_count", "desc"),
      startAfter(latestDocHottest),
      limit(lim)
    );
  } else {
    q = query(
      gptsRef,
      where("mostRecentMidnight", "==", startOfDay),
      orderBy("upvote_count", "desc"),
      limit(lim)
    );
  }

  const querySnapshot = await getDocs(q);

  latestDocHottest = querySnapshot.docs[querySnapshot.docs.length - 1];

  return querySnapshot.empty
    ? null
    : querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
}

export async function getMostRecent(lim, getMore = false) {
  let q = "";
  if (getMore) {
    q = query(
      gptsRef,
      orderBy("submittedAt", "desc"),
      startAfter(latestDocRecent),
      limit(lim)
    );
  } else {
    q = query(gptsRef, orderBy("submittedAt", "desc"), limit(lim));
  }
  const querySnapshot = await getDocs(q);

  latestDocRecent = querySnapshot.docs[querySnapshot.docs.length - 1];

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
    latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

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

  latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

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

export async function submitGpt(gpt) {
  const docRef = await addDoc(collection(db, "gpts"), gpt);
  try {
    const newComments = await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      transaction.set(docRef);
    });
  } catch (e) {
    console.log("Submit failed: ", e);
  }
  return docRef;
}

export async function toggleUpvoteGpt(gpt, uid, hasUserUpvoted) {
  const sfTime = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    })
  );

  const docRef = await doc(db, "gpts", gpt.id);

  try {
    const newUpvotes = await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }

      let oldUpvotes = sfDoc.data().upvotes;
      let newUpvotes = [];

      if (hasUserUpvoted) {
        const remove_index = oldUpvotes.findIndex((obj) => obj.uid === uid);
        newUpvotes = oldUpvotes.filter(
          (element, index) => index !== remove_index
        );
      } else {
        newUpvotes = [
          ...oldUpvotes,
          {
            submittedAt: sfTime,
            uid: uid,
          },
        ];
      }
      transaction.update(docRef, {
        upvote_count: newUpvotes.length,
        upvotes: newUpvotes,
      });
      return newUpvotes;
    });
    return newUpvotes;
  } catch (e) {
    console.log("Upvote failed: ", e);
  }
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

export async function addComment(user, gpt, comment) {
  const sfTime = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    })
  );

  const docRef = await doc(db, "gpts", gpt.id);

  try {
    const newComments = await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }

      const oldComments = sfDoc.data().comments;
      const newComments = [
        ...oldComments,
        {
          submittedAt: sfTime,
          userName: user.displayName.split(" ")[0],
          text: comment,
        },
      ];
      transaction.update(docRef, { comments: newComments });
      return newComments;
    });
    return newComments;
  } catch (e) {
    console.log("Comment failed: ", e);
  }
}

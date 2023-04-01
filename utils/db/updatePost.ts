import { doc, setDoc } from "firebase/firestore";

import { db } from "@lovesmell/config/firebase";

export default async function updatePost(
  collectionName: string,
  postId: string,
  data: any
) {
  const docRef = doc(db, collectionName, postId);

  let result = null;
  let error = null;

  try {
    result = await setDoc(docRef, data, { merge: true });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

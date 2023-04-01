import { deleteDoc, doc } from "firebase/firestore";

import { db } from "@lovesmell/config/firebase";

export default async function deletePost(
  collectionName: string,
  postId: string
) {
  const docRef = doc(db, collectionName, postId);

  let result = null;
  let error = null;

  try {
    result = await deleteDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

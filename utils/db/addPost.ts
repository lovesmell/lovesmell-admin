import { collection, addDoc } from "firebase/firestore";

import { db } from "@lovesmell/config/firebase";

export default async function addPost(collectionName: string, data: any) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, collectionName), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

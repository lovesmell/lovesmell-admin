import { doc, getDoc } from "firebase/firestore";

import { db } from "@lovesmell/config/firebase";

export default async function getPost(collectionName: string, id: string) {
  let result = null;
  let error = null;

  try {
    const response = await getDoc(doc(db, collectionName, id));
    result = response.data();
  } catch (e) {
    error = e;
  }

  return { result, error };
}

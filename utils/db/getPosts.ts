import { getFirestore, doc, getDoc } from "firebase/firestore";

import { app } from "@lovesmell/config/firebase";

const db = getFirestore(app);

export default async function getPosts(collection: string) {
  let docRef = doc(db, collection);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

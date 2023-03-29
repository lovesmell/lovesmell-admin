import { doc, getFirestore, setDoc } from "firebase/firestore";

import { app } from "@lovesmell/config/firebase";

const db = getFirestore(app);

export default async function addPost(colllection: string, data: any) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

import { collection, getDocs } from "firebase/firestore";

import { db } from "@lovesmell/config/firebase";

export default async function getPosts(collectionName: string) {
  const docRef = collection(db, collectionName);

  let result: any[] = [];
  let error = null;

  try {
    const response = await getDocs(docRef);
    response.forEach((post) => {
      result.push({
        id: post.id,
        ...post.data(),
      });
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

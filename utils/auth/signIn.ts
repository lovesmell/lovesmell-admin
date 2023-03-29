import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@lovesmell/config/firebase";

export default async function signIn(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

import { signOut as signOutFirebase } from "firebase/auth";

import { auth } from "@lovesmell/config/firebase";

export default async function signOut() {
  signOutFirebase(auth);
}

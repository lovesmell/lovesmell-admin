import admin from "firebase-admin";

import serviceAccount from "./serviceAccountKey.json";

if (!admin?.apps?.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL:
        "https://lovesmell-a9451-default-rtdb.asia-southeast1.firebasedatabase.app",
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

export default admin.firestore();

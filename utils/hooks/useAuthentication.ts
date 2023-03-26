import { useEffect, useState } from "react";

import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "@lovesmell/config/firebase";

export function useAuthentication() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
  };
}

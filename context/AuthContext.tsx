import React, { createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";

import { useAuthentication } from "@lovesmell/utils/hooks/useAuthentication";

interface IUserData {
  userProviderId: string;
  userId: string;
  userName: string | null;
  userEmail: string | null;
  userPhotoLink: string | null;
}

interface IAuthContext {
  currentUser: User | null;
  userData: IUserData | null;
}
export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  userData: null,
});

interface IProps {
  children: JSX.Element;
}

export const AuthContextProvider = ({ children }: IProps) => {
  const { user } = useAuthentication();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userData = {
        userProviderId: user.providerData[0].providerId,
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        userPhotoLink: user.photoURL,
      };

      setUserData(userData);
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

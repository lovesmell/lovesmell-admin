import React, { FC, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@lovesmell/context/AuthContext";

interface IProps {
  children: JSX.Element;
}

const AuthRoute: FC<IProps> = ({ children }) => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return <>{children}</>;
};

export default AuthRoute;

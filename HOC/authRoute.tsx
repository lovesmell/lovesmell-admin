import React, { FC, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { AuthContext } from "@lovesmell/context/AuthContext";

interface IProps {
  children: JSX.Element;
}

const AuthRoute: FC<IProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else if (pathname === "/login") {
      router.push("/");
    }
  }, [currentUser, pathname, router]);

  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
};

export default AuthRoute;

import React, { FC, useContext } from "react";
import { useRouter } from "next/router";

import { AuthContext } from "@lovesmell/context/AuthContext";

interface IProps {
  children: JSX.Element;
}

const AuthRoute: FC<IProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  if (currentUser) {
    return <>{children}</>;
  } else {
    router.push("/account/login");
    return <></>;
  }
};

export default AuthRoute;

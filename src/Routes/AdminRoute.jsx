import React from "react";
import { Outlet } from "react-router-dom";
import { Signin } from "../Components/Signin";

export const AdminRoute = () => {
  const loginInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <>
      {loginInfo !== null && loginInfo.isSignIn && loginInfo.isAdmin ? <Outlet /> : <Signin />}
    </>
  );
};


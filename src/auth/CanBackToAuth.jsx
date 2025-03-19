import React from "react";
import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";
const CanBackToAuth = () => {
  //prevent user go to login if he logged in
  const cookie = Cookie();
  const token = cookie.get("token");

  return token ? window.history.back() : <Outlet />;
};

export default CanBackToAuth;

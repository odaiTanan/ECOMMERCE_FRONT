import React from "react";
import { host, LOGOUT } from "../api/api";
import Cookie from "cookie-universal";
import { useNavigate, useNavigation } from "react-router-dom";
import { Axios } from "../api/Axios";
import { useState } from "react";
import useLogoutMutation from "../tanstckQuery/hooks/useLogoutMutation";
const Logout = () => {
  const { mutation, isPending } = useLogoutMutation();
  return (
    <button className="button" onClick={() => mutation.mutate()}>
      {isPending ? <div className="btn-loader"></div> : <span>Logout</span>}
    </button>
  );
};

export default Logout;

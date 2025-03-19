import React from "react";
import Button from "../components/Button";
import axios from "axios";
import { host, LOGOUT } from "../api/api";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { Axios } from "../api/Axios";
import { useState } from "react";
const Logout = () => {
  const cookie = Cookie();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  async function handleLogout() {
    try {
      setLoading(true);
      const res = await Axios.get(LOGOUT);
      setLoading(false);
      cookie.remove("token");
      nav("/login", { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <button className="button" onClick={handleLogout}>
      {loading ? <div className="btn-loader"></div> : <span>Logout</span>}
    </button>
  );
};

export default Logout;

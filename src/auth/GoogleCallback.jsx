import React, { useEffect } from "react";
import axios from "axios";
import { GOOGLE_CALL_BACK, host } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import Loading from "../components/Loading";
const GoogleCallback = () => {
  const location = useLocation();
  const cookie = Cookie();
  const nav = useNavigate();
  //handle google callback
  useEffect(() => {
    axios
      .get(host + GOOGLE_CALL_BACK + location.search)
      .then((res) => {
        console.log(res.data);
        cookie.set("token", res.data.access_token);
        window.location.pathname = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Loading />
    </div>
  );
};

export default GoogleCallback;

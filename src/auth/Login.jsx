import React from "react";
import { useState } from "react";
import background from "../assets/s.avif";
import axios from "axios";
import { host, LOGIN } from "../api/api";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Cookie from "cookie-universal";
import googleIcon from "../assets/google.png";
import logo from "../assets/logo.png";
const Login = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  //handle inputs changes
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  function submitFunction(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post(host + LOGIN, inputs)
      .then((res) => {
        const cookie = Cookie();
        cookie.set("token", res.data.token);
        const role = res.data.user.role;
        return role;
      })
      .then((role) => {
        //redirect depending on role
        const where =
          role == "1995"
            ? "/dashboard/users"
            : role == "1996"
            ? "/dashboard/writer"
            : role == "1999"
            ? "/dashboard/categories"
            : "/";
        setLoading(false);
        window.location.pathname = where;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          setError("Invalid Email Or Password");
        } else {
          setError("Internal server error");
        }
        setLoading(false);
      });
  }
  return (
    <>
      {" "}
      <header className="head continer">
        <Link to="/">
          <img src={logo} />
        </Link>
        <Link className="center" to="/register">
          Register{" "}
        </Link>
      </header>
      <div
        className="continer center"
        style={{ height: "calc(100vh - 120px)" }}
      >
        {" "}
        {loading && <Loading />}
        <div className="auth-form" style={{ height: "450px" }}>
          {" "}
          <form className="auth" onSubmit={submitFunction}>
            <h1>Login !</h1>
            <div className="inputs">
              <div>
                {" "}
                <input
                  type="email"
                  placeholder=" "
                  id="email"
                  name="email"
                  required
                  onChange={handleInputs}
                />
                <label htmlFor="email" className="inputLabel">
                  Email
                </label>{" "}
              </div>
              <div>
                {" "}
                <input
                  type="password"
                  id="password"
                  placeholder=" "
                  name="password"
                  required
                  onChange={handleInputs}
                  minLength="6"
                />
                <label htmlFor="password" className="inputLabel">
                  Password
                </label>{" "}
              </div>
              <Button type="Login" loading={false} />{" "}
              <a
                className="google-sign"
                href="http://127.0.0.1:8000/login-google"
              >
                <img src={googleIcon} alt="err" />{" "}
                <span> sign in with google</span>
              </a>{" "}
            </div>{" "}
            <span className="error">{error !== "" && error}</span>{" "}
          </form>
          <img src={background} alt="" id="cart" />
        </div>
      </div>
    </>
  );
};

export default Login;

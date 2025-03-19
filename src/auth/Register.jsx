import React from "react";
import { useState } from "react";
import background from "../assets/s.avif";
import axios from "axios";
import { host, REGISTER } from "../api/api";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Cookie from "cookie-universal";
import googleIcon from "../assets/google.png";
import logo from "../assets/logo.png";
const Register = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  //handle inputs changes
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  async function submitFunction(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(host + REGISTER, inputs);
      const cookie = Cookie();
      cookie.set("token", res.data.token);
      setLoading(false);
      window.location.pathname = "/";
    } catch (error) {
      if (error.response.status == 422) {
        setError("Email has already been taken");
      } else {
        setError("Internal server error");
      }
      setLoading(false);
    }
  }
  return (
    <>
      <header className="head continer">
        <Link to="/">
          <img src={logo} />
        </Link>
        <Link className="center" to="/login">
          Login{" "}
        </Link>
      </header>
      <div
        className="continer center"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {loading && <Loading />}
        <div className="auth-form">
          <form className="auth" onSubmit={submitFunction}>
            <h1>Register Now!</h1>
            <div className="inputs">
              <div>
                {" "}
                <input
                  type="text"
                  placeholder=" "
                  name="name"
                  id="name"
                  required
                  onChange={handleInputs}
                />
                <label htmlFor="name" className="inputLabel">
                  Name
                </label>
              </div>
              <div>
                {" "}
                <input
                  type="email"
                  placeholder=" "
                  name="email"
                  id="email"
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
                  placeholder=" "
                  name="password"
                  id="password"
                  required
                  onChange={handleInputs}
                  minLength="6"
                />
                <label htmlFor="password" className="inputLabel">
                  Password
                </label>{" "}
              </div>
              <Button type="Register" loading={false} />
              <a
                className="google-sign"
                href="http://127.0.0.1:8000/login-google"
              >
                <img src={googleIcon} alt="err" />{" "}
                <span> sign in with google</span>
              </a>{" "}
            </div>{" "}
            <span className="error">{error !== "" && error}</span>
          </form>
          <img src={background} alt="" id="cart" />
        </div>
      </div>
    </>
  );
};

export default Register;

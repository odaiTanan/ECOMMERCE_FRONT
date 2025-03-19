import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GET_USER, UPDATE_USER } from "../../../api/api";
import { Axios } from "../../../api/Axios";
import Button from "../../../components/Button";
import Title from "../../components/Title";

const UpdateUser = () => {
  const id = useParams().id;
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    setLoading(true);
    const res = Axios.get(GET_USER + id)
      .then((res) => {
        setLoading(false);
        setInputs({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        });
      })
      .catch(() => {
        nav("/Error404", { replace: true });
      });
  }, []);
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function submitFunction(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.post(UPDATE_USER + id, inputs);
      setLoading(false);
      nav("/dashboard/users");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <form className="dash-form" onSubmit={submitFunction}>
      <Title name="UPDATE USER" />{" "}
      <div className="dash-div">
        {" "}
        <input
          type="text"
          placeholder=" "
          name="name"
          id="name"
          value={inputs.name}
          required
          onChange={handleInputs}
        />
        <label htmlFor="email" className="inputLabel">
          name
        </label>
      </div>
      <div className="dash-div">
        {" "}
        <input
          type="email"
          placeholder=" "
          name="email"
          id="email"
          value={inputs.email}
          required
          onChange={handleInputs}
        />
        <label htmlFor="email" className="inputLabel">
          Email
        </label>{" "}
      </div>{" "}
      <div className="dash-div">
        {" "}
        <select
          name="role"
          className="form"
          value={inputs.role}
          onChange={handleInputs}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value={1995}>admin</option>
          <option value={2001}>user</option>
          <option value={1999}>products manager</option>
        </select>
      </div>
      <Button type="save" loading={loading} />
    </form>
  );
};

export default UpdateUser;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_CATEGORY, UPDATE_CATEGORY } from "../../../api/api";
import { Axios } from "../../../api/Axios";
import Button from "../../../components/Button";
import Title from "../../components/Title";

const UpdateCategory = () => {
  const id = useParams().id;
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    image: "",
  });
  useEffect(() => {
    setLoading(true);
    const res = Axios.get(GET_CATEGORY + id)
      .then((res) => {
        setLoading(false);
        setInputs({ ...inputs, title: res.data.title });
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
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("image", inputs.image);
    try {
      const res = await Axios.post(UPDATE_CATEGORY + id, formData);
      setLoading(false);
      nav("/dashboard/categories");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <form className="dash-form" onSubmit={submitFunction}>
      <Title name="UPDATE CATEGORY" />{" "}
      <div className="dash-div">
        {" "}
        <input
          type="text"
          placeholder=" "
          name="title"
          id="title"
          value={inputs.title}
          required
          onChange={handleInputs}
        />
        <label htmlFor="title" className="inputLabel">
          Title
        </label>
      </div>
      <div className="dash-div">
        {" "}
        <input
          type="file"
          placeholder=" "
          name="image"
          id="image"
          className="form"
          required
          onChange={(e) => {
            setInputs({ ...inputs, image: e.target.files.item(0) });
          }}
        />{" "}
        <label htmlFor="image" className="inputLabel">
          Image
        </label>{" "}
      </div>{" "}
      <Button type="save" loading={loading} />
    </form>
  );
};

export default UpdateCategory;

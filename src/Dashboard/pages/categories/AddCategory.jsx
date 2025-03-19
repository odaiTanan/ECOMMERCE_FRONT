import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_CATEGORY } from "../../../api/api";
import { Axios } from "../../../api/Axios";
import Button from "../../../components/Button";
import Title from "../../components/Title";

const AddCategory = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    image: "",
  });
  //handle inputs change
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function submitFunction(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("image", inputs.image);
    setLoading(true);
    try {
      const res = await Axios.post(ADD_CATEGORY, formData);
      setLoading(false);
      nav("/dashboard/categories");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <form className="dash-form" onSubmit={submitFunction}>
      <Title name="ADD CATEGORY" />{" "}
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
          Category Name
        </label>
      </div>
      <div className="dash-div">
        {" "}
        <input
          type="file"
          placeholder=" "
          name="image"
          id="image"
          required
          onChange={(e) =>
            setInputs({ ...inputs, image: e.target.files.item(0) })
          }
        />
        <label htmlFor="email" className="inputLabel">
          Image
        </label>{" "}
      </div>
      <Button type="Add" loading={loading} />
    </form>
  );
};

export default AddCategory;

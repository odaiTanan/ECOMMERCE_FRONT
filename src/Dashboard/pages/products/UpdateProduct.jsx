import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import {
  ADD_PRODUCT,
  CATEGORIES,
  DELETE_IMAGE,
  host,
  PRODUCT,
  PRODUCT_EDIT,
  PRODUCT_IMAGE,
} from "../../../api/api";
import { Axios } from "../../../api/Axios";
import Button from "../../../components/Button";
import { faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Title from "../../components/Title";
const UpdateProduct = () => {
  const nav = useNavigate();
  //states
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState("");
  //id to send image to
  const id = useParams().id;
  //disable var to prevent user of continue before select a category
  const [disabled, setDisabled] = useState(true);
  //images array
  const [images, setImages] = useState([]);
  const [deletedImagesIds, setDeletedImagesIds] = useState([]);
  //old product images
  const [oldImages, setOldImages] = useState([]);
  //ref to images input to help in handling
  const imagesRef = useRef();
  //ref counter to save counter value
  let counter = useRef(-1);
  //progress  bars of images array
  const progRef = useRef([]);
  //delete icons id
  const ids = useRef([]);
  //inputs values
  const [inputs, setInputs] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    images: [],
  });
  //hande inputs function
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  //get categories to select input
  useEffect(() => {
    setLoading(true);
    Axios.get(CATEGORIES)
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    try {
      Axios.get(`${PRODUCT}/${id}`)
        .then((res) => setInputs(res.data[0]))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);

  //hande images and send it  function
  async function handleImagesChanges(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesNow = [...images, ...e.target.files];
    for (let i = 0; counter.current < imagesNow.length - 1; i++) {
      counter.current++;
      const formData = new FormData();
      formData.append("product_id", id);
      formData.append("image", imagesNow[counter.current]);
      const res = await Axios.post(PRODUCT_IMAGE, formData, {
        onUploadProgress: (progress) => {
          const { loaded, total } = progress;
          const percent = Math.floor((loaded * 100) / total);
          //set load value every 10 percent to save cpu
          if (percent % 10 == 0) {
            progRef.current[counter.current].style.width = `${percent}%`;
          }
          if (percent == 100) {
            progRef.current[counter.current].parentElement.style.display =
              "none";
          }
        },
      });
      ids.current[counter.current] = res.data.id;
    }
  }

  //delete image
  async function deleteImage(key, image) {
    try {
      const res = await Axios.delete(DELETE_IMAGE + ids.current[key]);
      progRef.current = progRef.current.filter((progress) => {
        return progress != progRef.current[key];
      });
      ids.current = ids.current.filter((id) => {
        return id != ids.current[key];
      });
      counter.current--;
      setImages((prev) =>
        images.filter((img) => {
          return img != image;
        })
      );
    } catch (err) {
      console.log(err);
    }
  }
  //delete old images function
  function deleteOldImageFront(id) {
    const newImages = inputs.images.filter((img) => {
      return img.id != id;
    });
    setDeletedImagesIds((prev) => [...prev, id]);
    setInputs({ ...inputs, images: newImages });
  }
  //show images in page
  const showImages = images.map((img, index) => {
    return (
      <span key={index} className="imageCard">
        <span className="removeMark">
          <FontAwesomeIcon
            id={`icon${index}`}
            index={index}
            style={{ color: "red", cursor: "pointer" }}
            icon={faXmark}
            onClick={() => deleteImage(index, img)}
          />
        </span>
        <span className="imgCard">
          {" "}
          <img src={URL.createObjectURL(img)} alt="" />
        </span>

        <span className="desc ">
          <h1>{img["name"].slice(0, 12)}</h1>
          <p>
            {" "}
            {img.size >= 1000000
              ? `${(img.size / (1024 * 1024)).toFixed(1)} mb`
              : `${(img.size / 1024).toFixed(1)} kp `}
          </p>

          <span className="progressBarCon ">
            <span
              className="progressBar"
              id={`progressBar${index}`}
              ref={(e) => (progRef.current[index] = e)}
            ></span>
          </span>
        </span>
      </span>
    );
  });

  //show old images in page
  const showOldImages = inputs.images.map((img, index) => {
    return (
      <span key={index} className="imageCard imageOld">
        <span className="removeMark">
          <FontAwesomeIcon
            id={`icon${index}`}
            index={index}
            style={{ color: "red", cursor: "pointer" }}
            icon={faXmark}
            onClick={() => deleteOldImageFront(img.id)}
          />
        </span>
        <span className="imgCard">
          {" "}
          <img src={host.slice(0, -5) + img.image} alt="" />
        </span>
      </span>
    );
  });
  async function deleteFromServer() {
    for (let i = 0; i < deletedImagesIds.length; i++) {
      const res = await Axios.delete(DELETE_IMAGE + deletedImagesIds[i]);
    }
  }
  //edit product
  async function editSubmission(event) {
    event.preventDefault();

    setLoading(true);
    await deleteFromServer();
    try {
      const res = await Axios.post(PRODUCT_EDIT + id, inputs);
      setLoading(false);
      nav("/dashboard/products");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  //show categories in select
  const showCategories =
    categories !== ""
      ? categories.map((cat, index) => {
          return (
            <option key={index} value={cat.id}>
              {cat.title}
            </option>
          );
        })
      : "";
  return (
    <form className="dash-form" onSubmit={editSubmission}>
      <Title name="UPDATE PRODUCT" />{" "}
      <div className="dash-div">
        {" "}
        <select
          name="category"
          onChange={(e) => {
            handleInputs(e);
            submitFunction(e);
          }}
          className="form"
          value={inputs.category}
          id="category"
        >
          <option value="Select Category" disabled>
            Select Category
          </option>
          {showCategories}
        </select>
      </div>
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
          type="text"
          placeholder=" "
          name="description"
          id="description"
          value={inputs.description}
          required
          onChange={handleInputs}
        />
        <label htmlFor="description" className="inputLabel">
          description
        </label>
      </div>
      <div className="dash-div">
        {" "}
        <input
          type="text"
          placeholder=" "
          name="price"
          id="price"
          value={inputs.price}
          required
          onChange={handleInputs}
        />
        <label htmlFor="price" className="inputLabel">
          price
        </label>
      </div>
      <div className="dash-div">
        {" "}
        <input
          type="text"
          placeholder=" "
          name="discount"
          id="discount"
          value={inputs.discount}
          required
          onChange={handleInputs}
        />
        <label htmlFor="discount" className="inputLabel">
          discount
        </label>
      </div>
      <div className="dash-div">
        {" "}
        <input
          type="text"
          placeholder=" "
          name="About"
          id="About"
          value={inputs.About}
          required
          onChange={handleInputs}
        />
        <label htmlFor="About" className="inputLabel">
          about
        </label>
      </div>
      <div className="dash-div">
        {" "}
        <input
          multiple
          ref={imagesRef}
          type="file"
          placeholder=" "
          name="image"
          onChange={handleImagesChanges}
          hidden
        />
        <div
          id="imageSelect"
          className="selectImages"
          onClick={() => imagesRef.current.click()}
        >
          <FontAwesomeIcon icon={faImage} />
        </div>
      </div>
      <div
        className="imagesView dash-div"
        style={{
          borderBottom: "2px dotted var(--green)",
          paddingBottom: "20px",
        }}
      >
        {showOldImages}
      </div>
      <div className="imagesView dash-div">{showImages}</div>
      <Button type="save" loading={loading} />
    </form>
  );
};

export default UpdateProduct;

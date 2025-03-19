import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { host, PRODUCT } from "../../api/api";
import { Axios } from "../../api/Axios";
import calcStars from "../../helpers/CalcSatrs";
import Skeleton from "react-loading-skeleton";
import CustomSlice from "../../helpers/CustomSlice";
import { cartContext } from "../../context/CartContext";
const SingleProduct = () => {
  const CartContext = useContext(cartContext);
  const [stars, setStars] = useState();
  const [images, setImages] = useState([]);
  const id = useParams().id;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((res) => {
        setProduct(res.data);
        setImages(res.data[0].images);
        setStars(calcStars(res.data[0].rating));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const showImages = images.map((img) => {
    return {
      original: host.slice(0, -5) + img.image,
      thumbnail: host.slice(0, -5) + img.image,
      originalHeight: "200px",
      originalWidth: "200px",
    };
  });
  function addProduct(product) {
    const testFind = CartContext["cart"].find((p) => {
      return p.id == product.id;
    });
    if (!testFind) {
      const newPr = { ...product, quantity: 1 };
      CartContext.setCart((prev) => [...prev, newPr]);
    } else {
      testFind.quantity = +testFind.quantity + 1;
    }
  }

  const show = product.map((pro) => {
    return (
      <div className="discription">
        <div className="hstars">
          {" "}
          <h1>{CustomSlice(pro.title, 30)}</h1>
          <div className="stars">{stars}</div>
        </div>
        <span className="disc">{pro.description}</span>
        <span className="about">{pro.About}</span>
        {pro.discount ? (
          <div className="priceSaleDiv">
            {" "}
            <div>
              {" "}
              <span style={{ color: "green" }}>
                {pro.price - pro.discount}$
              </span>
              <span className="discount">{pro.price}$</span>
            </div>
            <div>
              {" "}
              <FontAwesomeIcon
                onClick={() => addProduct(pro)}
                className="cartIcon"
                icon={faCartPlus}
              />
            </div>
          </div>
        ) : (
          <div className="priceSaleDiv">
            {" "}
            <div>
              <span>{pro.price}$</span>
            </div>
            <div>
              {" "}
              <FontAwesomeIcon
                onClick={() => addProduct(pro)}
                className="cartIcon"
                icon={faCartPlus}
              />
            </div>
          </div>
        )}
      </div>
    );
  });
  return (
    <div className="continer single">
      {loading ? (
        <div className="singleCard">
          <div className="f-single-skeleton">
            <Skeleton
              baseColor={"#bbbdbc"}
              highlightColor={"#f2f0ef"}
              height={180}
              width={200}
            />
            <div>
              <Skeleton
                baseColor={"#bbbdbc"}
                highlightColor={"#f2f0ef"}
                height={60}
                width={60}
              />
              <Skeleton
                baseColor={"#bbbdbc"}
                highlightColor={"#f2f0ef"}
                height={60}
                width={60}
              />
              <Skeleton
                baseColor={"#bbbdbc"}
                highlightColor={"#f2f0ef"}
                height={60}
                width={60}
              />
            </div>
          </div>
          <div className="s-single-skeleton">
            <Skeleton
              baseColor={"#bbbdbc"}
              highlightColor={"#f2f0ef"}
              height={50}
              width={200}
            />
            <Skeleton
              baseColor={"#bbbdbc"}
              highlightColor={"#f2f0ef"}
              height={120}
              width={200}
            />
            <Skeleton
              baseColor={"#bbbdbc"}
              highlightColor={"#f2f0ef"}
              height={50}
              width={200}
            />
          </div>
        </div>
      ) : (
        <div className="singleCard">
          <div className="images">
            {" "}
            <ImageGallery
              items={showImages}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
          {show}
        </div>
      )}
    </div>
  );
};

export default SingleProduct;

import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { host } from "../api/api";
import { cartContext } from "../context/CartContext";
import calcStars from "../helpers/CalcSatrs";
import CustomSlice from "../helpers/CustomSlice";

const ProductCard = ({
  id,
  title,
  description,
  discount,
  price,
  images,
  rate,
  product,
}) => {
  const CartContext = useContext(cartContext);
  //handle product stars rate
  const stars = calcStars(rate);
  //handle plus and minus product
  function addProduct(product) {
    const testFind = CartContext["cart"].find((p) => {
      return p.id == product.id;
    });
    if (!testFind) {
      const newPr = { ...product, quantity: 1 };
      CartContext.setCart((prev) => [...prev, newPr]);
    } else {
      const newData = CartContext["cart"].map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      CartContext.setCart(newData);
    }
  }
  return (
    <div className="product-card">
      <div className="cardPhoto center">
        {" "}
        <Link to={`/product/${id}`}>
          <img
            src={
              images && images.length > 0 && host.slice(0, -5) + images[0].image
            }
            alt=""
          />
        </Link>
      </div>
      <div className="bottomSec">
        <div className="first">
          <Link to={`/product/${id}`}>{CustomSlice(title, 10)}</Link>
          <div className="stars">{stars}</div>
        </div>
        <span className="disc">{CustomSlice(description, 26)}</span>

        {discount ? (
          <div className="priceSaleDiv">
            {" "}
            <div>
              {" "}
              <span style={{ color: "green" }}>{price - discount}$</span>
              <span className="discount">{price}$</span>
            </div>
            <FontAwesomeIcon
              onClick={() => addProduct(product)}
              className="cartIcon"
              icon={faCartPlus}
            />
          </div>
        ) : (
          <div className="priceSaleDiv">
            {" "}
            <div>
              <span>{price}$</span>
            </div>
            <FontAwesomeIcon
              icon={faCartPlus}
              onClick={() => addProduct(product)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

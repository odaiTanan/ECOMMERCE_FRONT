import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import Cookie from "cookie-universal";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../api/Axios";
import HandleBuy from "../components/HandleBuy";
import { cartContext } from "../context/CartContext";
import CustomSlice from "../helpers/CustomSlice";
import { host } from "../api/api";
const Cart = () => {
  const [loading, setLoading] = useState(false);
  const CartContext = useContext(cartContext);
  const nav = useNavigate();
  //delete function
  function deleteProduct(pro) {
    const newA = CartContext["cart"].filter((product) => {
      return product != pro;
    });
    CartContext.setCart(newA);
  }
  //handle checkout with payment
  async function handleCheckout() {
    try {
      const cookie = Cookie();
      if (cookie.get("token")) {
        const ids = [];
        CartContext["cart"].map((item) => ids.push(item.id));
        const quantitiesPayload = {};
        CartContext["cart"].forEach((item) => {
          quantitiesPayload[item.id] = item.quantity;
        });
        setLoading(true);
        const res = await Axios.post("payment", {
          product_ids: ids,
          quantities: quantitiesPayload,
        });
        window.location.href = res.data.url;
      } else {
        nav("/login");
      }
    } catch (err) {
      err.status == 401 && nav("/login");
    } finally {
      setLoading(false);
    }
  }
  const show = CartContext["cart"].map((pro) => {
    return (
      <div className="cartCard">
        {" "}
        <img src={host.slice(0, -5) + pro.images[0].image} alt="proImg" />
        <div className="cart-card-disc">
          <div className="cart-card-title">
            <h2 style={{ fontSize: "20px" }}>{CustomSlice(pro.title, 16)}</h2>
            <FontAwesomeIcon
              onClick={() => deleteProduct(pro)}
              icon={faCircleXmark}
              style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
            />
          </div>

          <div className="cart-card-price">
            <HandleBuy product={pro} oldQuantity={pro.quantity} />
            <p style={{ color: "var(--green)" }}>
              {" "}
              {(pro.price - pro.discount) * +pro.quantity}$
            </p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div id="cartContiner">
      <h3 style={{ fontWeight: "bold" }} className="cart-title">
        Cart{" "}
        <span>
          <h4 style={{ color: "var(--g2)", marginRight: "5px" }}>Total: </h4>
          {CartContext["cart"].reduce((acc, i) => {
            acc += +(i.price - i.discount) * +i.quantity;
            return acc;
          }, 0)}
          {" $"}
        </span>
      </h3>
      <div className="buyed">{show}</div>
      <div onClick={handleCheckout} className="center" id="bottom">
        <div className="center" to="">
          {loading ? <span class="btn-loader"></span> : "Checkout"}
        </div>
      </div>
    </div>
  );
};

export default Cart;

import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { cartContext } from "../context/CartContext";
//function to add and remove products and control quantity
const HandleBuy = ({ product, oldQuantity }) => {
  const [quantity, setQuantity] = useState(1);
  const CartContext = useContext(cartContext);
  //get updated quantity from every where user change
  useEffect(() => {
    oldQuantity && setQuantity(+oldQuantity);
  }, [oldQuantity]);

  function handle(operation) {
    if (operation == "plus") {
      setQuantity((prev) => (prev += 1));
      const testFind = CartContext["cart"].find((p) => {
        return p.id == product.id;
      });
      if (!testFind) {
        const newPr = { ...product, quantity: 1 };
        CartContext.setCart((prev) => [...prev, newPr]);
      } else {
        const newData = CartContext["cart"].map((p) => {
          p.id == product.id ? (p.quantity = quantity + 1) : "";
          return p;
        });
        CartContext.setCart(newData);
      }
    } else {
      quantity > 1 && setQuantity((prev) => (prev -= 1));
      const testFind = CartContext["cart"].find((p) => {
        return p.id == product.id;
      });
      testFind.quantity = quantity - 1;
    }
  }
  return (
    <div className="plus-minus center">
      <FontAwesomeIcon icon={faCircleMinus} onClick={() => handle("minus")} />
      <input
        type="number"
        onChange={(e) => setQuantity(+e.target.value)}
        className="quantityLabel"
        value={quantity}
        min="1"
      />

      <FontAwesomeIcon icon={faCirclePlus} onClick={() => handle("plus")} />
    </div>
  );
};
export default HandleBuy;

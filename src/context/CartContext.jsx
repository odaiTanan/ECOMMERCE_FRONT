import { useEffect, useState } from "react";
import { createContext } from "react";

export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  //integrate context with localstorage to save data after refresh
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}

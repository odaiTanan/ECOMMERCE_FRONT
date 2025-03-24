import { StrictMode } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import SearchContextProvider from "./context/SearchContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
createRoot(document.getElementById("root")).render(
  <Router>
    <CartContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </CartContextProvider>
  </Router>
);

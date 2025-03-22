import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";
import "../css/components/header.css";
import "../css/components/handle-buy.css";
import "../css/pages/landing.css";
import "../css/pages/latest.css";
import "../css/pages/single.css";
import "../css/pages/categories.css";
import "../css/components/sectionTitle.css";
import "../css/pages/cart.css";
import "../css/skeleton/products-section-skeleton.css";
import "../css/skeleton/single-skeleton.css";
import "../css/pages/payment.css";
import Cookie from "cookie-universal";
import { Axios } from "../api/Axios";
import { CATEGORIES, USER } from "../api/api";
import { useState } from "react";
import CustomSlice from "../helpers/CustomSlice";
import Loading from "../components/Loading";
import { useContext } from "react";
import { categoriesContext } from "../context/CategoriesContext";
import Cart from "./Cart";
const Website = () => {
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const context = useContext(categoriesContext);
  const [loading, seLoading] = useState(true);
  const [regionError, setRegionError] = useState(false);
  const cookie = new Cookie();
  //get user
  useEffect(() => {
    cookie.get("token") &&
      Axios.get(USER)
        .then((res) => setUser(res.data))
        .catch((err) => {
          err.status == 401 && setUser(""), cookie.remove("token");
        });
  }, [cookie.get("token")]);
  //get categories
  useEffect(() => {
    seLoading(true);
    Axios.get(CATEGORIES)
      .then((res) => {
        context.setCategories(res.data);
      })
      .catch((err) => {
        err.status != 401 && setRegionError(true);
      })
      .finally(() => {
        seLoading(false);
      });
  }, []);
  if (regionError) return <h1>cant serve your region !</h1>;
  const categoriesShow = context.categories
    .map((cat, key) => {
      return (
        <NavLink
          onClick={() => setOpen(false)}
          className={"center"}
          to={`/categories/${cat.id}`}
        >
          {CustomSlice(cat.title, 12)}
        </NavLink>
      );
    })
    .slice(-4);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div
            style={{
              boxShadow: "0 0 4px 0 gray",
              position: "sticky",
              top: "0",
              zIndex: "10000",
            }}
          >
            <Header
              setActiveCart={setActiveCart}
              user={user}
              setOpen={setOpen}
              open={open}
            />
            <div style={{ width: "100%", backgroundColor: "white" }}>
              {" "}
              <div className="continer categories">
                <div style={{ right: open ? "0" : "-100%" }}>
                  {categoriesShow}
                  <NavLink className={"center"} to="categories">
                    show all
                  </NavLink>
                </div>
              </div>
            </div>
            <div id="cart" style={{ right: activeCart ? "0" : "-100%" }}>
              <Cart />
            </div>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Website;

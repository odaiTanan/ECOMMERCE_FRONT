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
import { useState } from "react";
import CustomSlice from "../helpers/CustomSlice";
import Cart from "./Cart";
import useCategoriesQuery from "../tanstckQuery/hooks/useCategoriesQuery";
import Skeleton from "react-loading-skeleton";
import useUserQuery from "../tanstckQuery/hooks/useUserQuery";
const Website = () => {
  const [open, setOpen] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const [regionError, setRegionError] = useState(false);
  //get user
  const { data: user = "", isLoading: userLoading } = useUserQuery();
  //get categories
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategoriesQuery({ setRegionError });
  if (regionError) return <h3>Sorry We Cant Serve Your Region</h3>;
  const categoriesShow = categories
    .map((cat, key) => {
      return (
        <NavLink
          key={key}
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
            userLoading={userLoading}
          />
          <div style={{ width: "100%", backgroundColor: "white" }}>
            {" "}
            <div className="continer categories ">
              <div
                className="headCategoriescon"
                style={{ right: open ? "0" : "-100%" }}
              >
                {categoriesLoading ? (
                  [...Array(4)].map((_, index) => (
                    <Skeleton
                      containerClassName="center catskeleton"
                      baseColor="#bbbdbc"
                      highlightColor="#f2f0ef"
                      height={40}
                      width={60}
                    />
                  ))
                ) : (
                  <>
                    {categoriesShow}
                    <NavLink className={"center"} to="categories">
                      show all
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
          <div id="cart" style={{ right: activeCart ? "0" : "-100%" }}>
            <Cart />
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Website;

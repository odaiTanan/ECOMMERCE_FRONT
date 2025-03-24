import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";
import UserTitle from "./UserTitle";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { searchContext } from "../context/SearchContext";
import { cartContext } from "../context/CartContext";
import Skeleton from "react-loading-skeleton";
const Header = ({ user, setOpen, setActiveCart, userLoading }) => {
  const SearchContext = useContext(searchContext);
  const CartContext = useContext(cartContext);
  return (
    <header>
      <div className="continer">
        <Link to="/">
          <img src={logo} />
        </Link>
        <FontAwesomeIcon
          style={{
            cursor: "pointer",
            display: "none",
          }}
          icon={faBars}
          onClick={() => setOpen((prev) => !prev)}
          id="ell"
        />
        <div className="searchBox center ">
          {" "}
          <input
            type="text"
            placeholder="search"
            className="searchInput"
            onChange={(e) => SearchContext.setSearch(e.target.value)}
          />
          <span
            id="searchIcon"
            onClick={() => SearchContext.setClicked(SearchContext.clicked + 1)}
            className="center"
          >
            <Link to="/search" style={{ color: "var(--g1)" }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>
          </span>
        </div>
        <div className="endHeader">
          <span className="center count">{CartContext["cart"]?.length}</span>
          <FontAwesomeIcon
            icon={faCartShopping}
            onClick={() => setActiveCart((prev) => !prev)}
          />

          {!userLoading ? (
            user ? (
              <UserTitle user={user} />
            ) : (
              <Link id="login" className="center" to="login">
                sign in
              </Link>
            )
          ) : (
            <Skeleton
              containerClassName="center"
              style={{ borderRadius: "50%" }}
              baseColor="#bbbdbc"
              highlightColor="#f2f0ef"
              height={40}
              width={40}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

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

const Header = ({ user, setOpen, setActiveCart }) => {
  const SearchContext = useContext(searchContext);

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
          <FontAwesomeIcon
            icon={faCartShopping}
            onClick={() => setActiveCart((prev) => !prev)}
          />
          {user ? (
            <UserTitle user={user} />
          ) : (
            <Link id="login" className="center" to="login">
              sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

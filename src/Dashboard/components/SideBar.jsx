import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { navs } from "./SideBarLink";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SideBar = (props) => {
  //side bar state and user role
  const open = props.open;
  const user = props.user;
  return (
    <div className="side-bar" style={{ width: open == 1 ? "250px" : "60px" }}>
      <div className="dashLogo">
        {open && <h2 style={{ marginLeft: "-18px" }}>Dashboard</h2>}{" "}
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faBars}
          onClick={() => props.setOpen(!open)}
        />
      </div>
      <div className="navLinks">
        {" "}
        {/*getting pages links depending on user role allowed pages */}
        {navs.map((nav, index) => {
          return (
            nav.role.includes(user.role) && (
              <NavLink
                key={index}
                className={!open ? "center link" : " link"}
                style={{ width: !open && "50px" }}
                to={nav.path}
              >
                {" "}
                <FontAwesomeIcon icon={nav.icon} className="side-bar-icon" />
                <span
                  className="activ"
                  style={{ display: open == 1 ? "flex" : "none" }}
                >
                  {nav.name}
                </span>
              </NavLink>
            )
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;

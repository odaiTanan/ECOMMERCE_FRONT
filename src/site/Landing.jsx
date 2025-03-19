import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/bg.png";
const Landing = () => {
  return (
    <div id="landing">
      <div className="continer">
        {" "}
        <div id="landingWords">
          <span id="message">
            Shop the latest trends in fashion and other and enjoy exclusive
            discounts.
          </span>{" "}
          <br /> <Link to="#latest">start now</Link>
        </div>
        <img src={bg} />
        <FontAwesomeIcon icon={faAnglesDown} />
      </div>
    </div>
  );
};

export default Landing;

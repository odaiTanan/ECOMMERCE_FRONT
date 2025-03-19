import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Cancle = () => {
  return (
    <div className="pay-page center">
      <span style={{ backgroundColor: "red" }} className="center">
        <FontAwesomeIcon icon={faXmark} />
      </span>
      <h1>Payment Canceled</h1>
      <Link className="center" to="/">
        Go To Home
      </Link>
    </div>
  );
};

export default Cancle;

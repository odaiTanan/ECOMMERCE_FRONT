import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <div className="pay-page center">
      <span className="center">
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <h1> Payment Successfull</h1>
      <Link className="center" to="/">
        Go To Home
      </Link>
    </div>
  );
};

export default Success;

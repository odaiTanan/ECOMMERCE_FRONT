import React from "react";
import UserTitle from "../../components/UserTitle";

import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <div className="header">
      <UserTitle user={props.user} />
    </div>
  );
};

export default Header;

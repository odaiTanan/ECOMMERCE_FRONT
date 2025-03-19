import React from "react";

const Button = (props) => {
  return (
    <button className="button center">
      {props.loading ? <span class="btn-loader"></span> : props.type}
    </button>
  );
};

export default Button;

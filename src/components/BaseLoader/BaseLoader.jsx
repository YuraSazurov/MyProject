import React from "react";
import "./_style.scss";

export const BaseLoader = ({ transform }) => {
  return (
    <div className={`base-loader ${transform ? "transform" : ""}`}>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

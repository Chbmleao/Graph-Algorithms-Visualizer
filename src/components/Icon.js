import React from "react";
import "../styles/IconStyles.css";

import { FaAngleRight } from "react-icons/fa6";
import { FaFlagCheckered } from "react-icons/fa6";

const Icon = ({ isStart }) => {
  if (isStart) {
    return (
      <div className="icon-container">
        <FaAngleRight data-testid="start-icon" className="start-icon" />
      </div>
    );
  } else {
    return (
      <div className="icon-container">
        <FaFlagCheckered data-testid="end-icon" className="end-icon" />
      </div>
    );
  }
};

export default Icon;

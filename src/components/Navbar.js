import { Link } from "react-router-dom";
import "../styles/NavbarStyles.css";

import React from "react";

import SelectBox from "./SelectBox";

const Navbar = ({
  onResetClick,
  onClearPathClick,
  onVisualizeClick,
  onAlgorithmSelect,
}) => {
  return (
    <div className="header">
      <Link to="/">
        <img src="logo.svg" alt="Graph logo" className="logo" />
      </Link>
      <ul className="nav-menu">
        <li>
          <SelectBox onAlgorithmSelect={onAlgorithmSelect} />
        </li>
        <li>
          <button onClick={onVisualizeClick}>Visualize</button>
        </li>
        <li>
          <button>Mazes</button>
        </li>
        <li>
          <button onClick={onResetClick}>Reset</button>
        </li>
        <li>
          <button onClick={onClearPathClick}>Clear Path</button>
        </li>
        <li>
          <button>Speed</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

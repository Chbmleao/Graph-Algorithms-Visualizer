import { Link } from "react-router-dom";
import "../styles/NavbarStyles.css";

import React from "react";

import SelectBox from "./SelectBox";
import SpeedCounter from "./SpeedCounter";
import ToggleSwitch from "./ToggleSwitch";

const Navbar = ({
  onResetClick,
  onClearPathClick,
  onVisualizeClick,
  onAlgorithmSelect,
  speed,
  onSpeedIncrement,
  onSpeedDecrement,
  onMazeClick,
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
          <ToggleSwitch />
        </li>
        <li>
          <button onClick={onVisualizeClick}>Visualize</button>
        </li>
        <li>
          <button onClick={onMazeClick}>Maze</button>
        </li>
        <li>
          <button onClick={onResetClick}>Reset</button>
        </li>
        <li>
          <button onClick={onClearPathClick}>Clear Path</button>
        </li>
        <li>
          <SpeedCounter
            speed={speed}
            onSpeedIncrement={onSpeedIncrement}
            onSpeedDecrement={onSpeedDecrement}
          />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

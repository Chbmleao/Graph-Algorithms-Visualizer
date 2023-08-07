import { Link } from "react-router-dom";
import "../styles/NavbarStyles.css";
import "../styles/colors.css";

import React from "react";

import SelectBox from "./SelectBox";
import SpeedCounter from "./SpeedCounter";
import ToggleSwitch from "./ToggleSwitch";

import { FaGithub } from "react-icons/fa";

const Navbar = ({
  onResetClick,
  onClearPathClick,
  onVisualizeClick,
  onAlgorithmSelect,
  speed,
  onSpeedIncrement,
  onSpeedDecrement,
  onMazeClick,
  onToggleSwitchClick,
  isAlgWeighted,
}) => {
  return (
    <div className="header">
      <div className="header-links">
        <Link to="/">
          <img src="logo.svg" alt="Graph logo" className="logo" />
        </Link>
        <Link
          to="https://github.com/Chbmleao/Graph-Algorithms-Visualizer"
          target="_blank"
        >
          <FaGithub className="github-icon" />
        </Link>
      </div>
      <ul className="nav-menu">
        <li>
          <SelectBox onAlgorithmSelect={onAlgorithmSelect} />
        </li>
        <li>
          <ToggleSwitch
            onToggleSwitchClick={onToggleSwitchClick}
            isAlgWeighted={isAlgWeighted}
          />
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

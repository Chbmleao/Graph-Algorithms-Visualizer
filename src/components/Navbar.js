import { Link } from "react-router-dom";
import "../styles/NavbarStyles.css";

import React, { useState } from "react";
import axios from "axios";

import SelectBox from "./SelectBox";

const Navbar = ({
  onClearClick,
  onGraphPathChange,
  getStartPosition,
  getEndPosition,
}) => {
  const [algorithmSelected, setAlgorithmSelected] = useState("none");

  const handleAlgorithmSelect = (algorithm) => {
    setAlgorithmSelected(algorithm);
  };

  const executeAlgorithm = async (route, coordinates) => {
    try {
      const data = {
        coordinates,
      };
      const response = await axios.post(route, data);
      console.log("Execute Algorithm Response:", response.data.message);
      onGraphPathChange(response.data.path);
    } catch (error) {
      console.error("Execute Algorithm Error", error);
      throw error;
    }
  };

  const handleVisualizeClick = () => {
    const startPosition = getStartPosition();
    const endPosition = getEndPosition();

    const coordinates = {
      startCoordinates: startPosition,
      endCoordinates: endPosition,
    };

    if (algorithmSelected !== "none") {
      const route = "http://localhost:5000/api/algorithm/" + algorithmSelected;
      executeAlgorithm(route, coordinates);
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img src="logo.svg" alt="Graph logo" className="logo" />
      </Link>
      <ul className="nav-menu">
        <li>
          <SelectBox onAlgorithmSelect={handleAlgorithmSelect} />
        </li>
        <li>
          <button onClick={handleVisualizeClick}>Visualize</button>
        </li>
        <li>
          <button>Mazes</button>
        </li>

        <li>
          <button onClick={onClearClick}>Clear</button>
        </li>
        <li>
          <button>Speed</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import "../styles/NavbarStyles.css";

import React from "react";

const Navbar = ({ onClearClick }) => {
  return (
    <div className="header">
      <Link to="/">
        <img src="logo.svg" alt="Graph logo" className="logo" />
      </Link>
      <ul className="nav-menu">
        <li>
          <button>Algorithms</button>
        </li>
        <li>
          <button>Mazes</button>
        </li>
        <li>
          <button>Visualize</button>
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

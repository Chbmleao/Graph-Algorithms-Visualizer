import React from "react";
import "../styles/TableLegendStyles.css";
import "../styles/colors.css";

import { FaAngleRight } from "react-icons/fa6";
import { FaFlagCheckered } from "react-icons/fa6";
import { TbWeight } from "react-icons/tb";

const TableLegend = () => {
  return (
    <div className="table-legend">
      <div className="legend-item">
        <FaAngleRight className="legend-icon" />
        <h2>Start Node</h2>
      </div>
      <div className="legend-item">
        <FaFlagCheckered className="legend-icon" />
        <h2>End Node</h2>
      </div>
      <div className="legend-item">
        <TbWeight className="legend-icon" />
        <h2>Weight Node</h2>
      </div>
      <div className="legend-item">
        <div className="unvisited node"></div>
        <h2>Unvisited Node</h2>
      </div>
      <div className="legend-item">
        <div className="visited node"></div>
        <h2>Visited Node</h2>
      </div>
      <div className="legend-item">
        <div className="shortest-path node"></div>
        <h2>Shortest Path Node</h2>
      </div>
      <div className="legend-item">
        <div className="wall node"></div>
        <h2>Wall Node</h2>
      </div>
    </div>
  );
};

export default TableLegend;

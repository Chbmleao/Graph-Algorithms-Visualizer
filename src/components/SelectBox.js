import "../styles/SelectBoxStyles.css";
import "../styles/colors.css";

import React from "react";

const SelectBox = ({ onAlgorithmSelect }) => {
  const handleAlgorithmChange = (event) => {
    const selectedAlgorithm = event.target.value;
    onAlgorithmSelect(selectedAlgorithm);
  };

  return (
    <div className="select">
      <select name="algorithms" onChange={handleAlgorithmChange}>
        <option value="dijkstra">Dijkstra</option>
        <option value="bfs">Breadth-first search (BFS)</option>
        <option value="dfs">Depth-first search (DFS)</option>
      </select>
    </div>
  );
};

export default SelectBox;

import "../styles/SelectBoxStyles.css";

import React from "react";

const SelectBox = () => {
  return (
    <div className="select">
      <select name="algorithms">
        <option selected value="0">
          Select an algorithm
        </option>
        <option value="dijkstra">Dijkstra</option>
        <option value="bfs">Breadth-first search (BFS)</option>
        <option value="dfs">Depth-first search (DFS)</option>
      </select>
    </div>
  );
};

export default SelectBox;

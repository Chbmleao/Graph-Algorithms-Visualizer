import React, { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  const [cellColors, setCellColors] = useState([]);
  const [startPosition, setStartPosition] = useState({ row: 0, col: 0 });
  const [endPosition, setEndPosition] = useState({ row: 0, col: 0 });
  const [graphPath, setGraphPath] = useState({
    allPath: [],
    startToEndPath: [],
  });

  const deleteAllWalls = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/removeAllWalls"
      );
      console.log("Delete All Walls Response:", response.data);
    } catch (error) {
      console.error("Delete All Walls Error", error);
      throw error;
    }
  };

  const handleGraphPathChange = (newGraphPath) => {
    handleClearPathClick();
    setGraphPath(newGraphPath);
  };

  const handleStartPositionChange = (newPosition) => {
    setStartPosition(newPosition);
  };

  const handleEndPositionChange = (newPosition) => {
    setEndPosition(newPosition);
  };

  const handleResetClick = () => {
    const updatedColors = [];

    setCellColors(updatedColors);
    deleteAllWalls();
  };

  const handleClearPathClick = () => {
    let updatedColors = [];

    for (let i = 0; i < cellColors.length; i++) {
      if (cellColors[i]) {
        updatedColors[i] = [];
        for (let j = 0; j < cellColors[i].length; j++) {
          const element = cellColors[i][j];
          if (element !== "#397788") {
            updatedColors[i][j] = cellColors[i][j];
          } else {
            updatedColors[i][j] = "#FFFFFF";
          }
        }
      } else {
        updatedColors[i] = undefined;
      }
    }

    setCellColors(updatedColors);
  };

  return (
    <div>
      <Navbar
        onResetClick={handleResetClick}
        onClearPathClick={handleClearPathClick}
        onGraphPathChange={handleGraphPathChange}
        getStartPosition={() => {
          return startPosition;
        }}
        getEndPosition={() => {
          return endPosition;
        }}
      />
      <Table
        cellColors={cellColors}
        setCellColors={setCellColors}
        startPosition={startPosition}
        endPosition={endPosition}
        onStartPositionChange={handleStartPositionChange}
        onEndPositionChange={handleEndPositionChange}
        graphPath={graphPath}
      />
    </div>
  );
}

export default App;

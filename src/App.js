import React, { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  const [cellColors, setCellColors] = useState([]);
  const [startPosition, setStartPosition] = useState({ row: 0, col: 0 });
  const [endPosition, setEndPosition] = useState({ row: 0, col: 0 });

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

  const handleStartPositionChange = (newPosition) => {
    setStartPosition(newPosition);
  };

  const handleEndPositionChange = (newPosition) => {
    setEndPosition(newPosition);
  };

  const handleClearClick = () => {
    const updatedColors = [];

    setCellColors(updatedColors);
    deleteAllWalls();
  };

  return (
    <div>
      <Navbar
        onClearClick={handleClearClick}
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
      />
    </div>
  );
}

export default App;

import React, { useState, useRef } from "react";
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
  const [algorithmSelected, setAlgorithmSelected] = useState("none");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [speed, setSpeed] = useState(5);
  const tableRef = useRef();

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

  const postWalls = async (wallsCoordinates) => {
    try {
      const data = {
        wallsCoordinates,
      };

      const response = await axios.post(
        "http://localhost:5000/api/addWalls",
        data
      );
      console.log("Post Walls Response:", response.data);
    } catch (error) {
      console.error("Post Wall Error", error);
      throw error;
    }
  };

  const handleGraphPathChange = (newGraphPath) => {
    handleClearPathClick();
    setGraphPath(newGraphPath);
  };

  const handleStartPositionChange = (newPosition) => {
    if (!isVisualizing) {
      setStartPosition(newPosition);
    }
  };

  const handleEndPositionChange = (newPosition) => {
    if (!isVisualizing) {
      setEndPosition(newPosition);
    }
  };

  const handleResetClick = () => {
    if (!isVisualizing) {
      const updatedColors = [];

      setCellColors(updatedColors);
      deleteAllWalls();
    }
  };

  const handleAlgorithmSelect = (algorithm) => {
    setAlgorithmSelected(algorithm);
  };

  const executeAlgorithm = async (route, coordinates) => {
    try {
      await equalityGraphTable();

      const data = {
        coordinates,
      };
      const response = await axios.post(route, data);
      console.log("Execute Algorithm Response:", response.data.message);
      handleGraphPathChange(response.data.path);
    } catch (error) {
      console.error("Execute Algorithm Error", error);
      throw error;
    }
  };

  const equalityGraphTable = async () => {
    await deleteAllWalls();
    let wallsCoordinates = [];

    for (let i = 0; i < cellColors.length; i++) {
      if (cellColors[i]) {
        for (let j = 0; j < cellColors[i].length; j++) {
          const element = cellColors[i][j];
          if (element === "#884A39") {
            wallsCoordinates.push({
              row: i,
              col: j,
            });
          }
        }
      }
    }

    postWalls(wallsCoordinates);
  };

  const handleVisualizeClick = () => {
    const coordinates = {
      startCoordinates: startPosition,
      endCoordinates: endPosition,
    };

    if (!isVisualizing) {
      setIsVisualizing(true);

      if (algorithmSelected !== "none") {
        const route =
          "http://localhost:5000/api/algorithm/" + algorithmSelected;
        executeAlgorithm(route, coordinates);
      }
    }
  };

  const handleClearPathClick = () => {
    let updatedColors = [];

    for (let i = 0; i < cellColors.length; i++) {
      if (cellColors[i]) {
        updatedColors[i] = [];
        for (let j = 0; j < cellColors[i].length; j++) {
          const element = cellColors[i][j];
          if (element !== "#397788" && element !== "#FFC300") {
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

  const handleSpeedIncrement = () => {
    if (speed < 10 && !isVisualizing) {
      const newSpeed = speed + 1;
      setSpeed(newSpeed);
    }
  };

  const handleSpeedDecrement = () => {
    if (speed > 1 && !isVisualizing) {
      const newSpeed = speed - 1;
      setSpeed(newSpeed);
    }
  };

  const handleMazeClick = async () => {
    if (!isVisualizing) {
      tableRef.current.createRandomMaze();
    }
  };

  return (
    <div>
      <Navbar
        onResetClick={handleResetClick}
        onClearPathClick={handleClearPathClick}
        onVisualizeClick={handleVisualizeClick}
        onAlgorithmSelect={handleAlgorithmSelect}
        speed={speed}
        onSpeedIncrement={handleSpeedIncrement}
        onSpeedDecrement={handleSpeedDecrement}
        onMazeClick={handleMazeClick}
      />
      <Table
        cellColors={cellColors}
        setCellColors={setCellColors}
        startPosition={startPosition}
        endPosition={endPosition}
        onStartPositionChange={handleStartPositionChange}
        onEndPositionChange={handleEndPositionChange}
        graphPath={graphPath}
        isVisualizing={isVisualizing}
        setIsVisualizing={setIsVisualizing}
        speed={speed}
        ref={tableRef}
      />
    </div>
  );
}

export default App;

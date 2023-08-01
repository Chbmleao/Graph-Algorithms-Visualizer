import React, { useState, useRef } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Table from "./components/Table";
import AlgorithmDescription from "./components/AlgorithmDescription";

const CELL_COLOR = "#000000";
const WALL_COLOR = "#934AF7";
const PATH_COLOR = "#27C44F";
const MIN_PATH_COLOR = "#FD9E00";

function App() {
  const [cellColors, setCellColors] = useState([]);
  const [cellWeights, setCellWeights] = useState([]);
  const [startPosition, setStartPosition] = useState({ row: 0, col: 0 });
  const [endPosition, setEndPosition] = useState({ row: 0, col: 0 });
  const [graphPath, setGraphPath] = useState({
    allPath: [],
    startToEndPath: [],
  });
  const [algorithmSelected, setAlgorithmSelected] = useState("dijkstra");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [isWeightSelected, setIsWeightSelected] = useState(false);
  const [isAlgWeighted, setIsAlgWeighted] = useState(true);
  const [algHasShortPath, setAlgHasShortPath] = useState(true);
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

  const postWeights = async (weightsCoordinates) => {
    try {
      const data = {
        weightsCoordinates,
      };

      const response = await axios.post(
        "http://localhost:5000/api/addWeights",
        data
      );
      console.log("Post Weights Response:", response.data);
    } catch (error) {
      console.error("Post Weights Error", error);
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
      const updatedWeights = [];

      setCellColors(updatedColors);
      setCellWeights(updatedWeights);
    }
  };

  const handleAlgorithmSelect = (algorithm) => {
    setAlgorithmSelected(algorithm);

    algorithm === "dijkstra" ? setIsAlgWeighted(true) : setIsAlgWeighted(false);
    algorithm === "dfs" ? setAlgHasShortPath(false) : setAlgHasShortPath(true);
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
          if (element === WALL_COLOR) {
            wallsCoordinates.push({
              row: i,
              col: j,
            });
          }
        }
      }
    }

    await postWalls(wallsCoordinates);

    let weightsCoordinates = [];

    for (let i = 0; i < cellWeights.length; i++) {
      if (cellWeights[i]) {
        for (let j = 0; j < cellWeights[i].length; j++) {
          const weight = cellWeights[i][j];
          if (weight > 1) {
            weightsCoordinates.push({
              row: i,
              col: j,
              weight: weight,
            });
          }
        }
      }
    }

    await postWeights(weightsCoordinates);
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
          if (element !== PATH_COLOR && element !== MIN_PATH_COLOR) {
            updatedColors[i][j] = cellColors[i][j];
          } else {
            updatedColors[i][j] = CELL_COLOR;
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

  const handleToggleSwitchClick = () => {
    setIsWeightSelected(!isWeightSelected);
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
        onToggleSwitchClick={handleToggleSwitchClick}
        isAlgWeighted={isAlgWeighted}
      />
      <AlgorithmDescription
        algAcronym={algorithmSelected}
        isWeighted={isAlgWeighted}
        hasShortPath={algHasShortPath}
      />
      <Table
        cellColors={cellColors}
        setCellColors={setCellColors}
        cellWeights={cellWeights}
        setCellWeights={setCellWeights}
        startPosition={startPosition}
        endPosition={endPosition}
        onStartPositionChange={handleStartPositionChange}
        onEndPositionChange={handleEndPositionChange}
        graphPath={graphPath}
        isVisualizing={isVisualizing}
        setIsVisualizing={setIsVisualizing}
        speed={speed}
        isWeightSelected={isWeightSelected}
        isAlgWeighted={isAlgWeighted}
        ref={tableRef}
      />
    </div>
  );
}

export default App;

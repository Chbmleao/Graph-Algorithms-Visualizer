import React, { useState, useRef, useEffect } from "react";

import Navbar from "./components/Navbar";
import Table from "./components/Table";
import AlgorithmDescription from "./components/AlgorithmDescription";
import TableLegend from "./components/TableLegend";

import GraphService from "./service/Graph";

const CELL_COLOR = "#000000";
const WALL_COLOR = "#934AF7";
const PATH_COLOR = "#27C44F";
const MIN_PATH_COLOR = "#FD9E00";

function App() {
  const [graphService, setGraphService] = useState(null);
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

  const tableSize = {
    numTableRows: 19,
    numTableCols: 40,
  };

  useEffect(() => {
    const numTableRows = tableSize.numTableRows;
    const numTableCols = tableSize.numTableCols;

    setStartPosition({
      row: Math.floor(numTableRows / 2),
      col: Math.floor(numTableCols / 10),
    });
    setEndPosition({
      row: Math.floor(numTableRows / 2),
      col: Math.floor((numTableCols / 10) * 9 - 1),
    });

    setGraphService(new GraphService(numTableRows, numTableCols));
  }, [tableSize.numTableRows, tableSize.numTableCols]);

  const deleteAllWalls = () => {
    graphService.removeAllWalls();
  };

  const postWalls = (wallsCoordinates) => {
    graphService.addWalls(wallsCoordinates);
  };

  const postWeights = (weightsCoordinates) => {
    graphService.addWeights(weightsCoordinates);
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

  const executeAlgorithm = (algName, coordinates) => {
    equalityGraphTable();

    const path = graphService.executeAlgorithm(algName, coordinates);
    handleGraphPathChange(path);
  };

  const equalityGraphTable = () => {
    deleteAllWalls();
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

    postWalls(wallsCoordinates);

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

    postWeights(weightsCoordinates);
  };

  const handleVisualizeClick = () => {
    const coordinates = {
      startCoordinates: startPosition,
      endCoordinates: endPosition,
    };

    if (!isVisualizing) {
      setIsVisualizing(true);

      executeAlgorithm(algorithmSelected, coordinates);
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

  const handleMazeClick = () => {
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
      <TableLegend />
      <Table
        tableSize={tableSize}
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

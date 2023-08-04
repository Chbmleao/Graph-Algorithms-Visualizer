import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import "../styles/TableStyles.css";

import TableCell from "./TableCell";

const CELL_COLOR = "#000000";
const WALL_COLOR = "#934AF7";
const PATH_COLOR = "#27C44F";
const MIN_PATH_COLOR = "#FD9E00";

const Table = forwardRef(
  (
    {
      tableSize,
      cellColors,
      setCellColors,
      cellWeights,
      setCellWeights,
      startPosition,
      endPosition,
      onStartPositionChange,
      onEndPositionChange,
      graphPath,
      isVisualizing,
      setIsVisualizing,
      speed,
      isWeightSelected,
      isAlgWeighted,
    },
    ref
  ) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isDraggingStart, setIsDraggingStart] = useState(false);
    const [isDraggingEnd, setIsDraggingEnd] = useState(false);

    const { numTableRows, numTableCols } = tableSize;

    const tableStyle = {
      "--numTableRows": numTableRows,
      "--numTableCols": numTableCols,
    };

    const createRandomMaze = () => {
      setCellColors([]);

      const numVertices = numTableRows * numTableCols;
      const numWalls = numVertices * 0.4;

      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

      for (let i = 0; i < numWalls; i++) {
        const row = getRandomNumber(0, numTableRows);
        const col = getRandomNumber(0, numTableCols);

        changeCellColor(row, col);
      }
    };

    useImperativeHandle(ref, () => ({
      createRandomMaze,
    }));

    const getTimeoutValue = () => {
      const maxValue = 50;
      return maxValue - 5 * speed;
    };

    useEffect(() => {
      const allPath = graphPath.allPath;
      const startToEndPath = graphPath.startToEndPath;

      const drawStartToEndPath = (index, cellColors) => {
        if (index >= startToEndPath.length) {
          setIsVisualizing(false);
          return;
        }

        setTimeout(() => {
          if (startToEndPath && startToEndPath.length > 0) {
            let updatedColors = [...cellColors];

            const { row, col } = startToEndPath[index];

            updatedColors[row] = updatedColors[row] || [];
            updatedColors[row][col] = MIN_PATH_COLOR;
            setCellColors(updatedColors);

            drawStartToEndPath(index + 1, updatedColors);
          }
        }, getTimeoutValue() * 1.5);
      };

      const drawAllPath = (index, cellColors) => {
        if (index >= allPath.length) {
          drawStartToEndPath(0, cellColors);
          return;
        }

        setTimeout(() => {
          if (allPath && allPath.length > 0) {
            let updatedColors = [...cellColors];

            const { row, col } = allPath[index];

            updatedColors[row] = updatedColors[row] || [];
            updatedColors[row][col] = PATH_COLOR;
            setCellColors(updatedColors);

            drawAllPath(index + 1, updatedColors);
          }
        }, getTimeoutValue());
      };

      drawAllPath(0, cellColors);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graphPath]);

    const isStartCell = (row, col) =>
      true ? row === startPosition.row && col === startPosition.col : false;

    const isEndCell = (row, col) =>
      true ? row === endPosition.row && col === endPosition.col : false;

    const changeCellColor = (rowIndex, cellIndex) => {
      if (
        !isStartCell(rowIndex, cellIndex) &&
        !isEndCell(rowIndex, cellIndex)
      ) {
        setCellColors((prevColors) => {
          const updatedColors = [...prevColors];
          updatedColors[rowIndex] = updatedColors[rowIndex] || [];
          updatedColors[rowIndex][cellIndex] = toggleColor(
            updatedColors[rowIndex]?.[cellIndex]
          );

          if (updatedColors[rowIndex][cellIndex] === WALL_COLOR) {
            removeCellWeight(rowIndex, cellIndex);
          }

          return updatedColors;
        });
      }
    };

    const changeCellWeight = (rowIndex, cellIndex, isIncreasing) => {
      if (cellColors[rowIndex]?.[cellIndex] !== WALL_COLOR) {
        setCellWeights((prevWeights) => {
          const updatedWeights = [...prevWeights];
          updatedWeights[rowIndex] = updatedWeights[rowIndex] || [];
          if (isIncreasing) {
            if (updatedWeights[rowIndex][cellIndex]) {
              updatedWeights[rowIndex][cellIndex] += 1;
            } else {
              updatedWeights[rowIndex][cellIndex] = 2;
            }
          } else {
            if (updatedWeights[rowIndex][cellIndex] > 1) {
              updatedWeights[rowIndex][cellIndex] -= 1;
            }
          }

          return updatedWeights;
        });
      }
    };

    const removeCellWeight = (rowIndex, cellIndex) => {
      setCellWeights((prevWeights) => {
        const updatedWeights = [...prevWeights];
        updatedWeights[rowIndex] = updatedWeights[rowIndex] || [];
        if (updatedWeights[rowIndex][cellIndex]) {
          updatedWeights[rowIndex][cellIndex] = 1;
        }
        return updatedWeights;
      });
    };

    const handleCellMouseDown = (rowIndex, cellIndex) => {
      if (!isVisualizing) {
        setIsMouseDown(true);
        if (isStartCell(rowIndex, cellIndex)) {
          setIsDraggingStart(true);
        } else if (isEndCell(rowIndex, cellIndex)) {
          setIsDraggingEnd(true);
        } else if (isWeightSelected) {
          changeCellWeight(rowIndex, cellIndex, true);
        } else {
          changeCellColor(rowIndex, cellIndex);
        }
      }
    };

    const handleCellMouseEnter = (rowIndex, cellIndex) => {
      if (
        isMouseDown &&
        !isDraggingStart &&
        !isDraggingEnd &&
        !isWeightSelected
      ) {
        changeCellColor(rowIndex, cellIndex);
      }
      if (isDraggingStart || isDraggingEnd) {
        const newPosition = { row: rowIndex, col: cellIndex };

        if (isDraggingStart) {
          onStartPositionChange(newPosition);
        } else {
          onEndPositionChange(newPosition);
        }

        if (cellColors[rowIndex]?.[cellIndex] === WALL_COLOR) {
          changeCellColor(rowIndex, cellIndex);
        }
      }
    };

    const handleCellMouseUp = () => {
      setIsMouseDown(false);
      setIsDraggingStart(false);
      setIsDraggingEnd(false);
    };

    const toggleColor = (currentColor) => {
      return currentColor === WALL_COLOR ? CELL_COLOR : WALL_COLOR;
    };

    const tableCellConstructor = (row, col) => {
      const cellStyle = {
        backgroundColor: cellColors[row]?.[col] || CELL_COLOR,
      };

      const isStart = isStartCell(row, col);
      const isEnd = isEndCell(row, col);

      const hasWeight = cellWeights[row]?.[col] > 1 && isAlgWeighted;
      const weight = hasWeight ? cellWeights[row][col] : 1;

      return (
        <TableCell
          row={row}
          col={col}
          cellStyle={cellStyle}
          isStart={isStart}
          isEnd={isEnd}
          weight={weight}
          handleCellMouseDown={handleCellMouseDown}
          handleCellMouseEnter={handleCellMouseEnter}
          handleCellMouseUp={handleCellMouseUp}
        />
      );
    };

    const rows = [];

    for (let i = 0; i < numTableRows; i++) {
      const cells = [];

      for (let j = 0; j < numTableCols; j++) {
        const cell = tableCellConstructor(i, j);
        cells.push(cell);
      }

      rows.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <table className="graph" style={tableStyle}>
        <tbody>{rows}</tbody>
      </table>
    );
  }
);

export default Table;

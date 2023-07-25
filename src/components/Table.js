import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import "../styles/TableStyles.css";
import axios from "axios";

import Icon from "./Icon";

const Table = forwardRef(
  (
    {
      cellColors,
      setCellColors,
      startPosition,
      endPosition,
      onStartPositionChange,
      onEndPositionChange,
      graphPath,
      isVisualizing,
      setIsVisualizing,
      speed,
    },
    ref
  ) => {
    const [numTableRows, setNumTableRows] = useState(0);
    const [numTableCols, setNumTableCols] = useState(0);
    const [tableStyle, setTableStyle] = useState({
      "--numTableRows": 20,
      "--numTableCols": 30,
    });
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isDraggingStart, setIsDraggingStart] = useState(false);
    const [isDraggingEnd, setIsDraggingEnd] = useState(false);

    const getTableSize = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tableSize");
        const tableSize = response.data;
        console.log("Table Size:", tableSize);
        setNumTableRows(tableSize.numTableRows);
        setNumTableCols(tableSize.numTableCols);
        onStartPositionChange({
          row: Math.floor(tableSize.numTableRows / 2),
          col: Math.floor(tableSize.numTableCols / 10),
        });
        onEndPositionChange({
          row: Math.floor(tableSize.numTableRows / 2),
          col: Math.floor((tableSize.numTableCols / 10) * 9 - 1),
        });
        setTableStyle({
          "--numTableRows": tableSize.numTableRows,
          "--numTableCols": tableSize.numTableCols,
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
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

    useEffect(() => {
      getTableSize();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            updatedColors[row][col] = "#FFC300";
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
            updatedColors[row][col] = "#397788";
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

          return updatedColors;
        });
      }
    };

    const handleCellMouseDown = (rowIndex, cellIndex) => {
      if (!isVisualizing) {
        if (isStartCell(rowIndex, cellIndex)) {
          setIsMouseDown(true);
          setIsDraggingStart(true);
        } else if (isEndCell(rowIndex, cellIndex)) {
          setIsMouseDown(true);
          setIsDraggingEnd(true);
        } else {
          setIsMouseDown(true);
          changeCellColor(rowIndex, cellIndex);
        }
      }
    };

    const handleCellMouseEnter = (rowIndex, cellIndex) => {
      if (!isVisualizing) {
        if (isMouseDown && !isDraggingStart && !isDraggingEnd) {
          changeCellColor(rowIndex, cellIndex);
        }
        if (isDraggingStart || isDraggingEnd) {
          const newPosition = { row: rowIndex, col: cellIndex };

          if (isDraggingStart) {
            onStartPositionChange(newPosition);
          } else {
            onEndPositionChange(newPosition);
          }

          if (cellColors[rowIndex]?.[cellIndex] === "#884A39") {
            changeCellColor(rowIndex, cellIndex);
          }
        }
      }
    };

    const handleCellMouseUp = () => {
      setIsMouseDown(false);
      setIsDraggingStart(false);
      setIsDraggingEnd(false);
    };

    const toggleColor = (currentColor) => {
      return currentColor === "#884A39" ? "#FFFFFF" : "#884A39";
    };

    const tableCellConstructor = (row, col) => {
      const cellStyle = {
        backgroundColor: cellColors[row]?.[col] || "#FFFFFF",
      };

      const isStart = isStartCell(row, col);
      const isEnd = isEndCell(row, col);

      let icon = "";
      if (isStart || isEnd) {
        icon = <Icon isStart={isStart} />;
      }
      return (
        <td
          data-row={row}
          data-col={col}
          key={col}
          style={cellStyle}
          onMouseDown={() => handleCellMouseDown(row, col)}
          onMouseEnter={() => handleCellMouseEnter(row, col)}
          onMouseUp={handleCellMouseUp}
        >
          {icon}
        </td>
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

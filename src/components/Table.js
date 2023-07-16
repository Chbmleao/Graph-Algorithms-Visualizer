import React, { useEffect, useState, useRef } from "react";
import "../styles/TableStyles.css";
import axios from "axios";

import DraggableIcon from "./Icon";

const Table = ({ cellColors, setCellColors }) => {
  const [numTableRows, setNumTableRows] = useState(0);
  const [numTableCols, setNumTableCols] = useState(0);
  const [startPosition, setStartPosition] = useState({ row: 0, col: 0 });
  const [endPosition, setEndPosition] = useState({ row: 0, col: 0 });
  const [tableStyle, setTableStyle] = useState({
    "--numTableRows": 20,
    "--numTableCols": 30,
  });
  const [isMouseDown, setIsMouseDown] = useState(false);

  const getTableSize = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tableSize");
      const tableSize = response.data;
      console.log("Table Size:", tableSize);
      setNumTableRows(tableSize.numTableRows);
      setNumTableCols(tableSize.numTableCols);
      setStartPosition({
        row: Math.floor(tableSize.numTableRows / 2),
        col: Math.floor(tableSize.numTableCols / 10),
      });
      setEndPosition({
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

  const postWall = async (row, col) => {
    try {
      const data = {
        i: row,
        j: col,
      };

      const response = await axios.post(
        "http://localhost:5000/api/addWall",
        data
      );
      console.log("Post Wall Response:", response.data);
    } catch (error) {
      console.error("Post Wall Error", error);
      throw error;
    }
  };

  const deleteWall = async (row, col) => {
    try {
      const data = {
        i: row,
        j: col,
      };

      const response = await axios.delete(
        "http://localhost:5000/api/removeWall",
        { data }
      );
      console.log("Delete Wall Response:", response.data);
    } catch (error) {
      console.error("Delete Wall Error", error);
      throw error;
    }
  };

  useEffect(() => {
    getTableSize();
  }, []);

  const changeCellColor = async (rowIndex, cellIndex) => {
    const coordinates = {
      row: rowIndex,
      col: cellIndex,
    };

    const strCoordinates = JSON.stringify(coordinates);
    const strStart = JSON.stringify(startPosition);
    const strEnd = JSON.stringify(endPosition);

    if (strCoordinates !== strStart && strCoordinates !== strEnd) {
      const updatedColors = [...cellColors];
      updatedColors[rowIndex] = updatedColors[rowIndex] || [];
      updatedColors[rowIndex][cellIndex] = toggleColor(
        updatedColors[rowIndex]?.[cellIndex]
      );

      if (updatedColors[rowIndex][cellIndex] === "#884A39") {
        try {
          await postWall(rowIndex, cellIndex);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await deleteWall(rowIndex, cellIndex);
        } catch (error) {
          console.error(error);
        }
      }

      setCellColors(updatedColors);
    }
  };

  const changeIconPosition = (row, col) => {
    const newPosition = { row: row, col: col };
    setStartPosition(newPosition);
  };

  const handleCellMouseDown = (rowIndex, cellIndex) => {
    setIsMouseDown(true);
    changeCellColor(rowIndex, cellIndex);
  };

  const handleCellMouseEnter = (rowIndex, cellIndex) => {
    if (isMouseDown) {
      changeCellColor(rowIndex, cellIndex);
    }
  };

  const handleCellMouseUp = () => {
    setIsMouseDown(false);
  };

  const toggleColor = (currentColor) => {
    return currentColor === "#884A39" ? "#FFFFFF" : "#884A39";
  };

  const tableCellConstructor = (row, col) => {
    const cellStyle = {
      backgroundColor: cellColors[row]?.[col] || "#FFFFFF",
    };

    const isStartCell = row === startPosition.row && col === startPosition.col;
    const isEndCell = row === endPosition.row && col === endPosition.col;

    let icon = "";
    if (isStartCell || isEndCell) {
      icon = <DraggableIcon isStart={isStartCell} />;
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
};

export default Table;

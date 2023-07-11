import React, { useState } from "react";
import "../styles/TableStyles.css";

const Table = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cellColors, setCellColors] = useState([]);

  const changeCellColor = (rowIndex, cellIndex) => {
    const updatedColors = [...cellColors];
    updatedColors[rowIndex] = updatedColors[rowIndex] || [];
    updatedColors[rowIndex][cellIndex] = toggleColor(
      updatedColors[rowIndex]?.[cellIndex]
    );

    setCellColors(updatedColors);
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

  const rows = [];

  for (let i = 0; i < 30; i++) {
    const cells = [];

    for (let j = 0; j < 40; j++) {
      const cellStyle = {
        backgroundColor: cellColors[i]?.[j] || "#FFFFFF",
      };

      cells.push(
        <td
          key={j}
          style={cellStyle}
          onMouseDown={() => handleCellMouseDown(i, j)}
          onMouseEnter={() => handleCellMouseEnter(i, j)}
          onMouseUp={handleCellMouseUp}
        ></td>
      );
    }

    rows.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <table className="graph">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;

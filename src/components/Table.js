import React, { useState } from "react";
import "../styles/TableStyles.css";
import Graph from "./Graph";

const Table = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cellColors, setCellColors] = useState([]);

  const numTableRows = 4;
  const numTableColumns = 4;

  const graph = new Graph(numTableRows * numTableColumns);

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

  const findNeighborhood = (rowIndex, colIndex) => {
    const neighborhood = [];
    neighborhood.push({
      i: rowIndex,
      j: colIndex - 1,
    });
    neighborhood.push({
      i: rowIndex - 1,
      j: colIndex,
    });
    neighborhood.push({
      i: rowIndex,
      j: colIndex + 1,
    });
    neighborhood.push({
      i: rowIndex + 1,
      j: colIndex,
    });

    const validNeighborhood = neighborhood.filter(({ i, j }) => {
      return i >= 0 && i < numTableRows && j >= 0 && j < numTableColumns;
    });

    return validNeighborhood;
  };

  const findVerticeIndex = (rowIndex, colIndex) => {
    return rowIndex * numTableColumns + colIndex;
  };

  const rows = [];

  for (let i = 0; i < numTableRows; i++) {
    const cells = [];

    for (let j = 0; j < numTableColumns; j++) {
      const cellStyle = {
        backgroundColor: cellColors[i]?.[j] || "#FFFFFF",
      };

      const cellId = findVerticeIndex(i, j);

      if (cellStyle.backgroundColor === "#FFFFFF") {
        const neighborhood = findNeighborhood(i, j);
        const neighborhoodIndexes = neighborhood.map((neighbor) => {
          return findVerticeIndex(neighbor.i, neighbor.j);
        });

        graph.addNeighbors(cellId, neighborhoodIndexes);
      } else {
        graph.createWall(cellId);
      }

      cells.push(
        <td
          key={j}
          style={cellStyle}
          onMouseDown={() => handleCellMouseDown(i, j)}
          onMouseEnter={() => handleCellMouseEnter(i, j)}
          onMouseUp={handleCellMouseUp}
        >
          {/* {findVerticeIndex(i, j)} */}
        </td>
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

import React from "react";
import "../styles/TableStyles.css";
import "../styles/colors.css";

import Icon from "./Icon";
import { TbWeight } from "react-icons/tb";

const TableCell = ({
  row,
  col,
  cellStyle,
  isStart,
  isEnd,
  weight,
  handleCellMouseDown,
  handleCellMouseEnter,
  handleCellMouseUp,
}) => {
  let icon = "";
  if (isStart || isEnd) {
    icon = <Icon isStart={isStart} />;
  } else if (weight > 1) {
    icon = (
      <div className="weight-icon">
        <TbWeight className="weight-svg" />
        <h4 className="weight-number">{weight}</h4>
      </div>
    );
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

export default TableCell;

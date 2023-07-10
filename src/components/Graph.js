import React from "react";
import "./GraphStyles.css";

const Graph = () => {
  const rows = [];

  for (let i = 0; i < 30; i++) {
    const cells = [];

    for (let j = 0; j < 40; j++) {
      cells.push(<td key={j}></td>);
    }

    rows.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <table className="graph">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Graph;

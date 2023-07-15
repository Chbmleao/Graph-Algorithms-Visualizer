import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  const [cellColors, setCellColors] = useState([]);

  const handleClearClick = () => {
    const updatedColors = [];

    setCellColors(updatedColors);
  };

  return (
    <div>
      <Navbar onClearClick={handleClearClick} />
      <Table cellColors={cellColors} setCellColors={setCellColors} />
    </div>
  );
}

export default App;

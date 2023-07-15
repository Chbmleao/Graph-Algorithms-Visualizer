import React, { useState } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  const [cellColors, setCellColors] = useState([]);

  const handleClearClick = () => {
    const updatedColors = [];

    setCellColors(updatedColors);
    deleteAllWalls();
  };

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Navbar onClearClick={handleClearClick} />
        <Table cellColors={cellColors} setCellColors={setCellColors} />
      </div>
    </DndProvider>
  );
}

export default App;

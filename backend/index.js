const express = require("express");
const cors = require("cors");
const Graph = require("./Graph");

const numTableRows = 20;
const numTableCols = 30;
const graph = new Graph(numTableRows, numTableCols);

graph.printGraph();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

app.post("/api/addWall", (req, res) => {
  const wallCoordinates = req.body;

  graph.addWall(wallCoordinates);

  graph.printGraph();

  res.status(200).json({ message: "Wall added successfully" });
});

app.delete("/api/removeWall", (req, res) => {
  const wallCoordinates = req.body;

  graph.removeWall(wallCoordinates);

  graph.printGraph();

  res.status(200).json({ message: "Wall removed successfully" });
});

app.delete("/api/removeAllWalls", (req, res) => {
  graph.removeAllWalls();

  graph.printGraph();

  res.status(200).json({ message: "All walls removed successfully" });
});

app.get("/api/tableSize", (req, res) => {
  const tableSize = graph.getTableSize();

  res.json(tableSize);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

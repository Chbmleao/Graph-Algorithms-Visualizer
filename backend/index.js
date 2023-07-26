const express = require("express");
const cors = require("cors");
const Graph = require("./Graph");

const numTableRows = 19;
const numTableCols = 40;
const graph = new Graph(numTableRows, numTableCols);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/addWall", (req, res) => {
  const wallCoordinates = req.body;

  graph.addWall(wallCoordinates);

  res.status(200).json({ message: "Wall added successfully" });
});

app.post("/api/addWalls", (req, res) => {
  const wallsCoordinates = req.body.wallsCoordinates;

  graph.addWalls(wallsCoordinates);

  res.status(200).json({ message: "Walls added successfully" });
});

app.delete("/api/removeWall", (req, res) => {
  const wallCoordinates = req.body;

  graph.removeWall(wallCoordinates);

  res.status(200).json({ message: "Wall removed successfully" });
});

app.delete("/api/removeAllWalls", (req, res) => {
  graph.removeAllWalls();

  res.status(200).json({ message: "All walls removed successfully" });
});

app.get("/api/tableSize", (req, res) => {
  const tableSize = graph.getTableSize();

  res.status(200).json(tableSize);
});

app.post("/api/algorithm/dijkstra", (req, res) => {
  const { startCoordinates, endCoordinates } = req.body.coordinates;

  const startIndex = graph.getVerticeIndex(startCoordinates);
  const endIndex = graph.getVerticeIndex(endCoordinates);

  const pathCoordinates = graph.dijkstra(startIndex, endIndex);

  res
    .status(200)
    .json({ message: "Dijkstra algorithm executed", path: pathCoordinates });
});

app.post("/api/algorithm/bfs", (req, res) => {
  const { startCoordinates, endCoordinates } = req.body.coordinates;

  const startIndex = graph.getVerticeIndex(startCoordinates);
  const endIndex = graph.getVerticeIndex(endCoordinates);

  const pathCoordinates = graph.bfs(startIndex, endIndex);

  res
    .status(200)
    .json({ message: "BFS algorithm executed", path: pathCoordinates });
});

app.post("/api/algorithm/dfs", (req, res) => {
  const { startCoordinates, endCoordinates } = req.body.coordinates;

  const startIndex = graph.getVerticeIndex(startCoordinates);
  const endIndex = graph.getVerticeIndex(endCoordinates);

  const pathCoordinates = graph.dfs(startIndex, endIndex);

  res
    .status(200)
    .json({ message: "DFS algorithm executed", path: pathCoordinates });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const Graph = require("./Graph");

const numTableRows = 4;
const numTableCols = 4;
const graph = new Graph(numTableRows, numTableCols);

graph.printGraph();

graph.addWall(5);

graph.printGraph();

const app = express();
app.use(cors());
const PORT = 5000;

app.post("/api/addWall", (req, res) => {
  const { cellIndex } = req.body;
  console.log(cellIndex);
});

app.get("/api/tableSize", (req, res) => {
  const tableSize = graph.getTableSize();

  res.json(tableSize);
});

app.post("/api/addNeighbors", (req, res) => {
  const data = req.body;

  res.status(200).json({
    message: "Add neighborhood successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

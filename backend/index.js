const express = require("express");
const Graph = require("./Graph");

const numTableRows = 4;
const numTableCols = 4;
const graph = new Graph(numTableRows, numTableCols);

graph.printGraph();

const app = express();
const PORT = 5000;

app.post("/api/addWall", (req, res) => {});

app.post("/api/addNeighbors", (req, res) => {
  const data = req.body;

  res.status(200).json({
    message: "Add neighborhood successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

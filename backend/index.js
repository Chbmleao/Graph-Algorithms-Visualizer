const express = require("express");
const cors = require("cors");
const Graph = require("./Graph");

const numTableRows = 4;
const numTableCols = 4;
const graph = new Graph(numTableRows, numTableCols);

graph.printGraph();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

app.post("/api/addWall", (req, res) => {
  const wallCoordinates = req.body;
  console.log(wallCoordinates);

  graph.addWall(wallCoordinates);

  res.status(200).json({ message: "Add wall sucessfully" });
});

app.get("/api/tableSize", (req, res) => {
  const tableSize = graph.getTableSize();

  res.json(tableSize);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

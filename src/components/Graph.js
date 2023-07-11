class Graph {
  constructor(numVertices) {
    this.numVertices = numVertices;

    this.matrix = [];

    for (let i = 0; i < numVertices; i++) {
      this.matrix[i] = [];

      for (let j = 0; j < numVertices; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  addNeighbors(index, neighborhood) {
    for (let key in neighborhood) {
      this.matrix[neighborhood[key]][index] = 1;
      this.matrix[index][neighborhood[key]] = 1;
    }
  }

  createWall(cellId) {
    for (let i = 0; i < this.numVertices; i++) {
      this.matrix[i][cellId] = 0;
      this.matrix[cellId][i] = 0;
    }
  }

  printGraph() {
    for (let i = 0; i < this.numVertices; i++) {
      console.log("Cell ", i, " neighborhood: ");
      for (let j = 0; j < this.numVertices; j++) {
        if (this.matrix[i][j] == 1) {
          console.log(j);
        }
      }
    }
  }
}

export default Graph;

const { type } = require("@testing-library/user-event/dist/type");

class Graph {
  constructor(numTableRows, numTableCols) {
    this.numTableRows = numTableRows;
    this.numTableCols = numTableCols;
    this.numVertices = numTableRows * numTableCols;
    this.matrix = [];

    this.createNullMatrix();

    this.addAllNeighbors();
  }

  getTableSize() {
    const tableSize = {
      numTableRows: this.numTableRows,
      numTableCols: this.numTableCols,
    };

    return tableSize;
  }

  createNullMatrix() {
    for (let i = 0; i < this.numVertices; i++) {
      this.matrix[i] = [];

      for (let j = 0; j < this.numVertices; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  addAllNeighbors() {
    for (let i = 0; i < this.numVertices; i++) {
      const coordinates = this.getVerticeCoordinates(i);

      const neighborhood = this.findNeighborhood(coordinates);

      this.addNeighbors(i, neighborhood);
    }
  }

  getVerticeCoordinates(verticeId) {
    const column = verticeId % this.numTableRows;
    const row = (verticeId - column) / this.numTableCols;
    const coordinates = { i: row, j: column };

    return coordinates;
  }

  getVerticeIndex(coordinates) {
    const rowIndex = coordinates.i;
    const colIndex = coordinates.j;

    return rowIndex * this.numTableCols + colIndex;
  }

  findNeighborhood(coordinates) {
    const row = coordinates.i;
    const col = coordinates.j;

    const neighborhood = [];
    neighborhood.push({
      i: row,
      j: col - 1,
    });
    neighborhood.push({
      i: row - 1,
      j: col,
    });
    neighborhood.push({
      i: row,
      j: col + 1,
    });
    neighborhood.push({
      i: row + 1,
      j: col,
    });

    const validNeighborhood = neighborhood.filter(({ i, j }) => {
      return i >= 0 && i < this.numTableRows && j >= 0 && j < this.numTableCols;
    });

    const neighborhoodIndexes = validNeighborhood.map((neighborCoordinates) => {
      return this.getVerticeIndex(neighborCoordinates);
    });

    return neighborhoodIndexes;
  }

  addNeighbors(index, neighborhood) {
    neighborhood.forEach((neighborCoordinates) => {
      this.matrix[neighborCoordinates.i];
    });

    for (let key in neighborhood) {
      this.matrix[neighborhood[key]][index] = 1;
      this.matrix[index][neighborhood[key]] = 1;
    }
  }

  addWall(verticeCoordinates) {
    const cellId = this.getVerticeIndex(verticeCoordinates);

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

module.exports = Graph;

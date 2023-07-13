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
    const column = verticeId % this.numTableCols;
    const row = Math.floor(verticeId / this.numTableCols);
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
    neighborhood.forEach((neighbor) => {
      this.matrix[index][neighbor] = 1;
    });
  }

  addWall(verticeCoordinates) {
    const neighborhood = this.findNeighborhood(verticeCoordinates);

    const verticeId = this.getVerticeIndex(verticeCoordinates);

    neighborhood.forEach((neighbor) => {
      this.matrix[neighbor][verticeId] = 0;
    });
  }

  removeWall(verticeCoordinates) {
    const neighborhood = this.findNeighborhood(verticeCoordinates);

    const verticeId = this.getVerticeIndex(verticeCoordinates);

    neighborhood.forEach((neighbor) => {
      this.matrix[neighbor][verticeId] = 1;
    });
  }

  printGraph() {
    let total = 0;

    for (let i = 0; i < this.numVertices; i++) {
      // console.log("Cell", i, "neighborhood: ");
      for (let j = 0; j < this.numVertices; j++) {
        if (this.matrix[i][j] == 1) {
          // process.stdout.write(j.toString());
          // process.stdout.write("  ");
          total += 1;
        }
      }
      // console.log();
    }
    console.log("total:", total);
  }
}

module.exports = Graph;

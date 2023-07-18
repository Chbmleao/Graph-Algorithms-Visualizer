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

  removeAllWalls() {
    this.addAllNeighbors();
  }

  minDistance(dist, sptSet) {
    let min = Number.MAX_VALUE;
    let minIndex = -1;

    for (let v = 0; v < this.numVertices; v++) {
      if (sptSet[v] == false && dist[v] <= min) {
        min = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  }

  dijkstra(src) {
    let dist = new Array(this.numVertices);
    let sptSet = new Array(this.numVertices);

    for (let i = 0; i < this.numVertices; i++) {
      dist[i] = Number.MAX_VALUE;
      sptSet[i] = false;
    }

    dist[src] = 0;

    for (let count = 0; count < this.numVertices - 1; count++) {
      let u = this.minDistance(dist, sptSet);
      sptSet[u] = true;

      for (let v = 0; v < this.numVertices; v++) {
        if (
          !sptSet[v] &&
          this.matrix[u][v] != 0 &&
          dist[u] != Number.MAX_VALUE &&
          dist[u] + this.matrix[u][v] < dist[v]
        ) {
          dist[v] = dist[u] + this.matrix[u][v];
        }
      }
    }

    this.printSolution(dist);
  }

  printSolution(dist) {
    console.log("Vertex \t\t Distance from Source");
    for (let i = 0; i < this.numVertices; i++) {
      console.log(i + " \t\t " + dist[i]);
    }
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

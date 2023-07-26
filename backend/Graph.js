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
    const coordinates = { row: row, col: column };

    return coordinates;
  }

  getVerticeIndex(coordinates) {
    const rowIndex = coordinates.row;
    const colIndex = coordinates.col;

    return rowIndex * this.numTableCols + colIndex;
  }

  findNeighborhood(coordinates) {
    const row = coordinates.row;
    const col = coordinates.col;

    const neighborhood = [];
    neighborhood.push({
      row: row,
      col: col - 1,
    });
    neighborhood.push({
      row: row - 1,
      col: col,
    });
    neighborhood.push({
      row: row,
      col: col + 1,
    });
    neighborhood.push({
      row: row + 1,
      col: col,
    });

    const validNeighborhood = neighborhood.filter(({ row, col }) => {
      return (
        row >= 0 &&
        row < this.numTableRows &&
        col >= 0 &&
        col < this.numTableCols
      );
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

  addWalls(verticesCoordinates) {
    verticesCoordinates.forEach((item, index) => {
      this.addWall(item);
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

  getReturnPathCoordinates(allPath, startToEndPath) {
    const allPathCoord = allPath.map((index) => {
      return this.getVerticeCoordinates(index);
    });

    const stePathCoord = startToEndPath.map((index) => {
      return this.getVerticeCoordinates(index);
    });

    const path = {
      allPath: allPathCoord,
      startToEndPath: stePathCoord,
    };

    return path;
  }

  bfs(start, end) {
    let visited = new Array(this.numVertices).fill(false);
    let parents = new Array(this.numVertices).fill(-1);
    let startToEndPath = [];
    let allPath = [];
    let queue = [];

    visited[start] = true;
    queue.push(start);

    while (queue.length > 0) {
      let currentVertice = queue.shift();
      allPath.push(currentVertice);
      if (currentVertice === end) {
        break;
      }

      for (let i = 0; i < this.numVertices; i++) {
        if (this.matrix[currentVertice][i] === 1 && !visited[i]) {
          visited[i] = true;
          parents[i] = currentVertice;
          queue.push(i);
        }
      }
    }

    if (visited[end]) {
      let currentVertice = end;
      while (currentVertice !== -1) {
        startToEndPath.unshift(currentVertice);
        currentVertice = parents[currentVertice];
      }
    }

    const path = this.getReturnPathCoordinates(allPath, startToEndPath);

    return path;
  }

  dfsAux(vertice, visited, allPath, startToEndPath, end) {
    visited[vertice] = true;
    allPath.push(vertice);
    startToEndPath.push(vertice);

    for (let i = 0; i < this.numVertices; i++) {
      if (startToEndPath[startToEndPath.length - 1] === end) {
        return;
      }
      if (this.matrix[vertice][i] === 1) {
        let n = i;
        if (!visited[n]) {
          this.dfsAux(n, visited, allPath, startToEndPath, end);
        }
      }
    }

    if (startToEndPath[startToEndPath.length - 1] !== end) {
      startToEndPath.pop();
    }
  }

  dfs(start, end) {
    let visited = new Array(this.numVertices).fill(false);

    let startToEndPath = [];
    let allPath = [];

    this.dfsAux(start, visited, allPath, startToEndPath, end);

    const path = this.getReturnPathCoordinates(allPath, startToEndPath);

    return path;
  }

  minDistance(dist, sptSet) {
    let min = Number.MAX_VALUE;
    let minIndex = -1;

    for (let v = 0; v < this.numVertices; v++) {
      if (sptSet[v] === false && dist[v] <= min) {
        min = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  }

  dijkstra(start, end) {
    let dist = new Array(this.numVertices).fill(Number.MAX_VALUE);
    let sptSet = new Array(this.numVertices).fill(false);
    let parent = new Array(this.numVertices).fill(-1);

    let allPath = [];
    let startToEndPath = [];

    dist[start] = 0;

    for (let count = 0; count < this.numVertices - 1; count++) {
      let u = this.minDistance(dist, sptSet);
      sptSet[u] = true;
      allPath.push(u);

      if (u === end) {
        break;
      }

      for (let v = 0; v < this.numVertices; v++) {
        if (
          !sptSet[v] &&
          this.matrix[u][v] != 0 &&
          dist[u] != Number.MAX_VALUE &&
          dist[u] + this.matrix[u][v] < dist[v]
        ) {
          dist[v] = dist[u] + this.matrix[u][v];
          parent[v] = u;
        }
      }
    }

    let currentVertex = end;
    while (currentVertex != -1) {
      startToEndPath.unshift(currentVertex);
      currentVertex = parent[currentVertex];
    }

    const path = this.getReturnPathCoordinates(allPath, startToEndPath);
    return path;
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
      console.log("Cell", i, "neighborhood: ");
      for (let j = 0; j < this.numVertices; j++) {
        if (this.matrix[i][j] == 1) {
          process.stdout.write(j.toString());
          process.stdout.write("  ");
          total += 1;
        }
      }
      console.log();
    }
    console.log("total:", total);
  }
}

module.exports = Graph;

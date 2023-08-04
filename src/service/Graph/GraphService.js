import Graph from "./utils";

class GraphService {
  constructor(numTableRows, numTableCols) {
    this.graph = new Graph(numTableRows, numTableCols);
  }

  removeAllWalls() {
    this.graph.removeAllWalls();
  }

  addWalls(wallCoordinates) {
    this.graph.addWalls(wallCoordinates);
  }

  addWeights(weightsCoordinates) {
    this.graph.addWeights(weightsCoordinates);
  }

  executeAlgorithm(algName, coordinates) {
    const { startCoordinates, endCoordinates } = coordinates;

    const startIndex = this.graph.getVerticeIndex(startCoordinates);
    const endIndex = this.graph.getVerticeIndex(endCoordinates);

    const actions = {
      dfs: () => {
        return this.graph.dfs(startIndex, endIndex);
      },
      bfs: () => {
        return this.graph.bfs(startIndex, endIndex);
      },
      default: () => {
        return this.graph.dijkstra(startIndex, endIndex);
      },
    };

    const action = actions[algName] || actions.default;
    const pathCoordinates = action();

    return pathCoordinates;
  }
}
export default GraphService;

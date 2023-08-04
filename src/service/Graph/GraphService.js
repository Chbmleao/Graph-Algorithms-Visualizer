import Graph from "./utils";

class GraphService {
  constructor(numTableRows, numTableCols) {
    this.graph = new Graph(numTableRows, numTableCols);
  }

  removeAllWalls() {
    console.log("remove all walls");
    this.graph.removeAllWalls();
  }

  addWalls(wallCoordinates) {
    console.log("add walls", wallCoordinates);
    this.graph.addWalls(wallCoordinates);
  }

  addWeights(weightsCoordinates) {
    console.log("add weights", weightsCoordinates);
    this.graph.addWeights(weightsCoordinates);
  }

  executeAlgorithm(algName, coordinates) {
    console.log("execute algorithm");
    console.log("alg name:", algName);
    console.log("coordinates:", coordinates);
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

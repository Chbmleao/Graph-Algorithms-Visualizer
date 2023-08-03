# Path Finding Algorithms Visualizer

This project provides an interface to visualize the functionality of various pathfinding algorithms.
A pathfinding algorithm builds on top of a graph search algorithm and explores routes between nodes, starting at one node and traversing through relationships until the destination has been reached.
These algorithms find the cheapest path in terms of the number of hops or weight. Weights can be anything measured, such as time, distance, capacity, or cost.
In this project, the graph is represented as an adjacency matrix with non-negative weights.

## Implemented Algorithms

### Depth First Search (DFS)

Depth First Search is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking. Extra memory, a stack, is needed to keep track of the nodes discovered so far along a specified branch, which helps in backtracking of the graph. This algorithm does not guarantee the shortest path from one node to another, and it is not weighted.

[Learn more about DFS](https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/)

### Breadth First Search (BFS)

The Breadth First Search algorithm is used to search a graph data structure. It starts from the root node and visits all the nodes at a particular level before moving on to the next level. To do this, a queue is used. All the adjacent unvisited nodes of the current level are pushed into the queue, and the nodes of the current level are marked visited and popped from the queue. This algorithm guarantees the shortest path from one node to another, and it is not weighted.

[Learn more about BFS](https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/)

### Dijkstra's Algorithm

Dijkstra's algorithm is a popular algorithm for finding the shortest path from a single source to all other nodes in a graph with non-negative edge weights. The algorithm maintains a set of visited vertices and a set of unvisited vertices. It starts at the source vertex and iteratively selects the unvisited vertex with the smallest tentative distance from the source. Then, it visits the neighbors of this vertex and updates their tentative distances if a shorter path is found. This process continues until the destination vertex is reached, or all reachable vertices have been visited. This algorithm guarantees the shortest path from one node to another, and it is weighted.

[Learn more about Dijkstra](https://www.geeksforgeeks.org/introduction-to-dijkstras-shortest-path-algorithm/)

## Installation and Usage Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/Chbmleao/Graph-Algorithms-Visualizer
cd Graph-Algorithms-Visualizer
```

### 2. Clone dependencies:

This project has only frontend dependencies, since backend uses pure javascript. Run the following commands to install:

```bash
npm install
```

### 3. Start the project:

To start frontend and backend server, run the following command:

```bash
npm start
```

This will launch the server using `nodemon`, which will automatically restart the server whenever you make changes to the backend code. That also will start the development server for the frontend, and you can access the application in your browser at `http://localhost:3000`.

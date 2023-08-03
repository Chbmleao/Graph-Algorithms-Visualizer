# Path Finding Algorithms Visualizer

This is a project that provides an interface to visualize the functionality of some path finding algorithms.
A path finding build on top of a graph search algorithm and explore routes between nodes, starting at one node and traversing through relationships until the destinantion has been reached.
These algorithms find the cheapest path in terms of the number of hops or weight.
Weights can be anything measured, such as time, distance, capacity or cost.
The following sections briefly explain the implemented algorithms in this project.

## Depth First Search (DFS)

Depth first search is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root nod and explores as far as possible along each branch before backtracking. Extra memory, a stack, is needed to keep track of the nodes discovered so far along a specified branch which helps in backtracking of the graph. This algorithm does not guarantee the shortest path from one node to another and it isn't weighted.
[More about DFS](https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/)

## Breadth First Search (BFS)

The Breadth first search algorithm is used to search a graph data structure. Starting from the root, all the nodes at a particular level are visited first and then the nodes of the next level are traversed till all the nodes are visited. To do this, a queue is used. All the adjacent unvisited nodes of the current level are pushed into the queue and the nodes of the current level are marked visited and popped from the queue. This algorithm guarantees the shortest path from one node to another and it isn't weighted.
[More about BFS](https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/)

## Dijkstra

Dijkstra's algorithm is a popular algorithm for solving many single-source shortest path problems having non-negative edge weight in the graphs. The algorithm maintains a set of visited vertices and a set of unvisited vertices. It starts at the source vertex and iteratively selects the unvisited vertex with the smallest tentative distance from the source. It the visits the neighbors of this vertex and updates their tentative distances if a shorter path is found. This process continues until the destination vertex is reached, or all reachable vertices have been visited. This algorithm guarantees the shortest path from one node to another and it is weighted.
[More about Dijkstra](https://www.geeksforgeeks.org/introduction-to-dijkstras-shortest-path-algorithm/)

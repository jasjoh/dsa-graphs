/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    // node that has 0 or more adjacents
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (let adj of vertex.adjacent) {
      adj.adjacent.delete(vertex);
    }

    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let stack = [start];
    let visited = new Set(stack);
    let values = [];

    while (stack.length) {
      console.log("STACK BEFORE POP", stack);
      let current = stack.pop();
      values.push(current.value);

      for (let adj of current.adjacent) {
        if (!visited.has(adj)) {
          stack.push(adj);
          visited.add(adj);
        }
      }
    }
    return values;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let queue = [start];
    let visited = new Set(queue);
    let values = [];

    while (queue.length) {
      let current = queue.shift();
      values.push(current.value);

      for (let neighbor of current.adjacent) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
    return values;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    let queue = [[start, 0]];
    let visited = new Set(queue);

    while (queue.length) {
      let currentTuple = queue.shift();
      if (currentTuple[0] === end) {
        // we found the node! yay!
        return currentTuple[1];
      }

      for (let neighbor of currentTuple[0].adjacent) {
        if (!visited.has(neighbor)) {
          queue.push([neighbor, currentTuple[1] + 1]);
          visited.add(neighbor);
        }
      }
    }

    return;
  }
}

module.exports = { Graph, Node }

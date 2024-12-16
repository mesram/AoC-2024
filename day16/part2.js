const map = [];
for await (const line of console) {
    map.push(line.split(""));
}

let height = map.length;
let width = map[0].length;

const startRow = height - 2;
const startColumn = 1;
const startKey = `${startRow}.${startColumn}.>`

const finishRow = 1;
const finishColumn = width - 2;
const finishKeys = [`${finishRow}.${finishColumn}.>`, `${finishRow}.${finishColumn}.^`]

const edges = {}
const incoming = {}

const nodeQueue = [{ direction: ">", row: startRow, column: startColumn }];

while (nodeQueue.length > 0) {
    const node = nodeQueue.shift();

    const key = nodeKey(node);

    const { direction, row, column } = node;

    if (key in edges) continue; // already handled

    const up = { direction: "^", row: row - 1, column };
    const down = { direction: "v", row: row + 1, column };
    const left = { direction: "<", row: row, column: column - 1 };
    const right = { direction: ">", row: row, column: column + 1 };

    const outgoing = [];

    if (direction !== "^" && validNode(down)) {
        nodeQueue.push(down);
        outgoing.push({ key: nodeKey(down), cost: direction === "v" ? 1 : 1001 });
    }
    if (direction !== "v" && validNode(up)) { 
        nodeQueue.push(up); 
        outgoing.push({ key: nodeKey(up), cost: direction === "^" ? 1 : 1001 });
    }
    if (direction !== "<" && validNode(right)) { 
        nodeQueue.push(right); 
        outgoing.push({ key: nodeKey(right), cost: direction === ">" ? 1 : 1001 });
    }
    if (direction !== ">" && validNode(left)) { 
        nodeQueue.push(left);
        outgoing.push({ key: nodeKey(left), cost: direction === "<" ? 1 : 1001 });
    }

    edges[key] = outgoing;
}

// generate the reverse graph so that we can run dijkstra's algorithm backwards
// could also have made edges an array but I already had the solution working using a dictionary
const reverseEdges = {};
for (const [from, outgoing] of Object.entries(edges)) {
    for (const { key, cost } of outgoing) {
        reverseEdges[key] ??= [];
        reverseEdges[key].push({ key: from, cost });
    }
}

const [dist] = dijkstra(edges, startKey);
// get the distances in the reverse direction
const [reverseDistRight] = dijkstra(reverseEdges, `${finishRow}.${finishColumn}.>`);
const [reverseDistUp] = dijkstra(reverseEdges, `${finishRow}.${finishColumn}.^`);

const minDistance = Math.min(...finishKeys.map(k => dist[k]));

const result = new Set();
result.add(`${startRow}.${startColumn}`);

// deterine all the cells that are on a "best path"
// they are on a best path if the sum of their distances from both ends is equal to the known smallest distance
for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
        for (const direction of "^v<>") {
            let key = nodeKey({ direction, row, column });
            if (!validNode({ direction, row, column })) continue;
            let sumRight = dist[key] + reverseDistRight[key];
            let sumUp = dist[key] + reverseDistUp[key];
            if (sumRight === minDistance || sumUp === minDistance) {
                result.add(`${row}.${column}`);
            }            
        }   
    }
}

console.log(result.size);

function dijkstra(edges, source) {
    const dist = Object.fromEntries(Object.keys(edges).map(key => [key, Number.POSITIVE_INFINITY]));
    const prev = Object.fromEntries(Object.keys(edges).map(key => [key, undefined]));
    const Q = Object.keys(edges);

    dist[source] = 0;

    while (Q.length > 0) {
        let minDist = Number.POSITIVE_INFINITY;
        let minIndex = -1;
        let u = null;
        for (let i = 0; i < Q.length; i += 1) {
            const vertex = Q[i];
            if (dist[vertex] < minDist) {
                minDist = dist[vertex];
                minIndex = i;
                u = vertex;
            }
        }

        Q.splice(minIndex, 1); // remove u

        for (const { key, cost } of (edges[u] ?? [])) {
            let alt = dist[u] + cost;
            if (alt < dist[key]) {
                dist[key] = alt
                prev[key] = u
            }
        }
    }

    return [dist, prev];
}

function validNode(node) {
    return map[node.row][node.column] !== "#"
}

function nodeKey(node) {
    return `${node.row}.${node.column}.${node.direction}`
}
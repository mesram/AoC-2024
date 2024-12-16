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

const dist = {}
const prev = {}
const Q = [];

const nodeQueue = [{ direction: ">", row: startRow, column: startColumn }];

while (nodeQueue.length > 0) {
    const { direction, row, column } = nodeQueue.shift();
    // if (map[row][column] === "E") continue;

    const key = `${row}.${column}.${direction}`;
    if (key in edges) continue; // already handled

    dist[key] = Number.POSITIVE_INFINITY;
    prev[key] = undefined;
    Q.push(key);

    const up = { direction: "^", row: row - 1, column };
    const down = { direction: "v", row: row + 1, column };
    const left = { direction: "<", row: row, column: column - 1 };
    const right = { direction: ">", row: row, column: column + 1 };

    const outgoing = [];

    if (direction !== "^" && validNode(down)) {
        nodeQueue.push(down);
        outgoing.push({ ...down, cost: direction === "v" ? 1 : 1001 });
        const k = nodeKey(down);
    }
    if (direction !== "v" && validNode(up)) { 
        nodeQueue.push(up); 
        outgoing.push({ ...up, cost: direction === "^" ? 1 : 1001 });
    }
    if (direction !== "<" && validNode(right)) { 
        nodeQueue.push(right); 
        outgoing.push({ ...right, cost: direction === ">" ? 1 : 1001 });
    }
    if (direction !== ">" && validNode(left)) { 
        nodeQueue.push(left);
        outgoing.push({ ...left, cost: direction === "<" ? 1 : 1001 });
    }

    edges[key] = outgoing;
}

dist[startKey] = 0;

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

    for (const edge of edges[u]) {
        const k = nodeKey(edge);
        let alt = dist[u] + edge.cost;
        if (alt < dist[k]) {
            dist[k] = alt
            prev[k] = u
        }
    }
}

console.log(Math.min(...finishKeys.map(k => dist[k])));

function validNode(node) {
    return map[node.row][node.column] !== "#"
}

function nodeKey(node) {
    return `${node.row}.${node.column}.${node.direction}`
}
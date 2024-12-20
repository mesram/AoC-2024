const grid = await Array.fromAsync(console).then(lines => lines.map(line => line.split("")));

const height = grid.length;
const width = grid[0].length;

let start;
let end;

const edges = {};

for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
        let key = `${row}.${column}`
        let tileValue = grid[row][column];
        if (tileValue === "S") start = key;
        if (tileValue === "E") end = key;

        edges[key] = [];

        if (row > 0 && grid[row - 1][column] !== "#") {
            edges[key].push({ key:`${row - 1}.${column}`, cost: 1 });
        }
        if (row < height - 1 && grid[row + 1][column] !== "#") {
            edges[key].push({ key:`${row + 1}.${column}`, cost: 1 });
        }
        if (column > 0 && grid[row][column - 1] !== "#") {
            edges[key].push({ key:`${row}.${column - 1}`, cost: 1 });
        }
        if (column < width - 1 && grid[row][column + 1] !== "#") {
            edges[key].push({ key:`${row}.${column + 1}`, cost: 1 });
        }
    }
}

// console.log(start, end, edges);

const distancesFromStart = dijkstra(edges, start);
const distancesFromEnd = dijkstra(edges, end);

let standardDistance = distancesFromStart[end];

let shortcuts = new Set();

for (let row = 1; row < height - 1; row += 1) {
    for (let column = 1; column < width - 1; column += 1) {
        if (grid[row][column] !== "#") continue;

        let current = `${row}.${column}`

        let up = `${row - 1}.${column}`;
        let down = `${row + 1}.${column}`;
        let left = `${row}.${column - 1}`;
        let right = `${row}.${column + 1}`;

        let directions = [up, down, left, right];

        let minStart = Math.min(...directions.map(d => distancesFromStart[d]));

        for (const dest of directions) {
            if (!Number.isFinite(distancesFromStart[dest])) continue;

            let pathLength = minStart + distancesFromEnd[dest] + 2;
            if (pathLength <= standardDistance - 100) {
                shortcuts.add(`${current}->${dest}`);
            }
        }
    }
}

console.log(shortcuts.size);

// let savings = B - A - 2
// for (const cheatPossibilities)
// console.log(standardDistance, cheatPossibilities.length);

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

    return dist;
}

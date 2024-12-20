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
        let src = `${row}.${column}`
        if (!Number.isFinite(distancesFromStart[src])) continue;

        for (let dRow = -20; dRow <= 20; dRow += 1) {
            for (let dCol = -20 + Math.abs(dRow); dCol <= 20 - Math.abs(dRow); dCol += 1) {
                let dest = `${row + dRow}.${column + dCol}`;
                if (!(dest in distancesFromEnd) || !Number.isFinite(distancesFromEnd[dest])) continue;

                let pathLength = (distancesFromStart[src]) + distancesFromEnd[dest] + Math.abs(dRow) + Math.abs(dCol);
                if (pathLength <= standardDistance - 100) {
                    shortcuts.add(`${src}->${dest}`);
                }
            }
        }
    }
}

console.log(shortcuts.size);

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

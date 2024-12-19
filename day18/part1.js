let example = false;

let dim = example ? 7 : 71;
let stepCount = example ? 12 : 1024;

let grid = new Array(dim).fill(null).map(() => new Array(dim).fill(null).map(() => true));

const data = await Array.fromAsync(console).then((lines) => lines.map(line => line.split(",").map(Number)));

for (const [column, row] of data.slice(0, stepCount)) {
    grid[row][column] = false;
}

const edges = {};

for (let row = 0; row < dim; row += 1) {
    for (let column = 0; column < dim; column += 1) {
        let key = `${row}.${column}`
        edges[key] = [];

        if (row > 0 && grid[row - 1][column]) {
            // add up
            edges[key].push({ key:`${row - 1}.${column}`, cost: 1 })
        }
        if (row < dim - 1 && grid[row + 1][column]) {
            // add down
            edges[key].push({ key:`${row + 1}.${column}`, cost: 1 })
        }
        if (column > 0 && grid[row][column - 1]) {
            // add left
            edges[key].push({ key:`${row}.${column - 1}`, cost: 1 })
        }
        if (column < dim - 1 && grid[row][column + 1]) {
            // add right
            edges[key].push({ key:`${row}.${column + 1}`, cost: 1 })
        }
    }
}

const [dist] = dijkstra(edges, `0.0`);
console.log(dist[`${dim - 1}.${dim - 1}`]);

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

let map = [];

for await (const line of console) {
    map.push(line.split("").map(Number));
}

let height = map.length;
let width = map[0].length;

let total = 0;
for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
        if (map[row][column] === 0) {
            total += getTrailheadEndpoints(row, column).filter((v, i, a) => a.indexOf(v) === i).length;
        }
    }
}

console.log(total);

function getTrailheadEndpoints(row, column) {
    let currentValue = map[row][column];
    if (currentValue === 9) return [`${row}.${column}`];

    return [
        [row - 1, column],
        [row + 1, column],
        [row, column - 1],
        [row, column + 1],
    ].filter(([r, c]) => map[r]?.[c] === currentValue + 1)
    .flatMap(([r, c]) => getTrailheadEndpoints(r, c));
}
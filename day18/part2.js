let example = false;

let dim = example ? 7 : 71;

let grid = new Array(dim).fill(null).map(() => new Array(dim).fill(null).map(() => true));

const data = await Array.fromAsync(console).then((lines) => lines.map(line => line.split(",").map(Number)));

for (let step = 0; step < data.length; step += 1) {
    const [column, row] = data[step];
    grid[row][column] = false;

    if (!isAccessible(grid, [dim - 1, dim - 1])) {
        console.log([column, row].join(","));
        break;
    }
}


function isAccessible(grid, target) {
    const [targetRow, targetColumn] = target;
    let checked = new Set();
    let queue = [[0, 0]];

    while (queue.length > 0) {
        const [row, column] = queue.shift();
        let key = `${row}.${column}`;
        if (checked.has(key)) continue;
        checked.add(key);

        if (row === targetRow && column === targetColumn) return true;

        if (row > 0 && grid[row - 1][column]) {
            queue.push([row - 1, column]);
        }

        if (row < dim - 1 && grid[row + 1][column]) {
            queue.push([row + 1, column]);
        }

        if (column > 0 && grid[row][column - 1]) {
            queue.push([row, column - 1]);
        }

        if (column < dim - 1 && grid[row][column + 1]) {
            queue.push([row, column + 1]);
        }
    }

    return false;
}
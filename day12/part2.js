const grid = [];

for await (const line of console) {
    grid.push(line.split(""));
}


const height = grid.length;
const width = grid[0].length;

const up =  [-1, 0];
const down = [+1, 0];
const left = [0, -1];
const right = [0, +1];

const directions = [up, down, left, right];

let queue = [];
for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column +=1) {
        queue.push([row, column])
    }
}

let total = 0;

while (queue.length > 0) {
    let groupQueue = [queue.shift()];

    let value;
    let perimeter = 0;

    const edges = new Map();
    directions.forEach((direction) => edges.set(direction, []));

    const group = new Set();

    while (groupQueue.length > 0) {
        const [row, column] = groupQueue.pop();
        queue = queue.filter(([r, c]) => r !== row || c !== column);
        group.add(`${row}.${column}`);
        value = grid[row][column];

        for (const direction of directions) {
            const [dRow, dCol] = direction;
            const r = row + dRow;
            const c = column + dCol;
            const neighbourKey = `${r}.${c}`;
    
            const neighbour = grid[r]?.[c];            
            if (neighbour !== value) {
                perimeter += 1;
                edges.get(direction).push([row, column]);
            } else if (!group.has(neighbourKey)) {
                groupQueue.push([r, c]);
                group.add(neighbourKey);
            }
        }
    }

    let edgeCount = 0;
    for (const direction of directions) {
        const edgeList = edges.get(direction);
        let grouped;

        if (direction === up || direction === down) {
            grouped = edgeList.reduce((acc, [row, column]) => {
                acc[row] ??= [];
                acc[row].push(column);
                return acc;
            }, {});
        } else {
            grouped = edgeList.reduce((acc, [row, column]) => {
                acc[column] ??= [];
                acc[column].push(row);
                return acc;
            }, {});
        }

        for (const columns of Object.values(grouped)) {
            let previous = Number.NEGATIVE_INFINITY;
            columns.sort((a, b) => a - b);
            for (const column of columns) {
                if (column !== previous + 1) {
                    edgeCount += 1;
                }
                previous = column;
            }
        }
    }

    // console.log(`Added group "${value}" with P=${perimeter}, A=${group.size}, E=${edgeCount}`);
    total += group.size * edgeCount;
}

console.log(total);
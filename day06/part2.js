let map = [];
for await (const line of console) {
    map.push(line.split(""));
}

let height = map.length;
let width = map[0].length;

const nextMap = {
    "^": { rotation: ">", nextRowOffset: -1, nextColumnOffset: 0 },
    ">": { rotation: "v", nextRowOffset: 0, nextColumnOffset: +1 },
    "v": { rotation: "<", nextRowOffset: +1, nextColumnOffset: 0 },
    "<": { rotation: "^", nextRowOffset: 0, nextColumnOffset: -1 },
}

let startingRow;
let startingColumn;
let startingDirection;

for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
        const item = map[row][column];
        if ("^>v<".includes(item)) {
            startingRow = row;
            startingColumn = column;
            startingDirection = item;
        }
    }
}

map[startingRow][startingColumn] = '.'; // just get a bare map without the guard

let direction = startingDirection;
let row = startingRow;
let column = startingColumn;

let visits = new Set();
let total = 0;
while (true) {
    const key = `${row}.${column}`;
    if (!visits.has(key) && (row !== startingRow || column !== startingColumn)) {
        map[row][column] = "#";
        if (createsLoop()) {
            total += 1;
        }
        map[row][column] = ".";
        // add obstruction here instead and test if it loops
    }

    visits.add(key);

    const { rotation, nextRowOffset, nextColumnOffset } = nextMap[direction];
    
    const nextCell = map[row + nextRowOffset]?.[column + nextColumnOffset];
    if (!nextCell) {
        // done
        break;
    } else if (nextCell === "#") {
        // rotate
        direction = rotation;
    } else {
        // move forward
        row += nextRowOffset;
        column += nextColumnOffset;
    }
}

console.log(total);

function createsLoop() {
    let visits = new Set();
    let direction = startingDirection;
    let row = startingRow;
    let column = startingColumn;

    while (true) {
        const key = `${direction}.${row}.${column}`;
        if (visits.has(key)) {
            return true;
        }

        visits.add(key);

        const { rotation, nextRowOffset, nextColumnOffset } = nextMap[direction];
        
        const nextCell = map[row + nextRowOffset]?.[column + nextColumnOffset];
        if (!nextCell) {
            // done
            return false;
        } else if (nextCell === "#") {
            // rotate
            direction = rotation;
        } else {
            // move forward
            row += nextRowOffset;
            column += nextColumnOffset;
        }
    }
}
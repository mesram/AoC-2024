let map = [];
for await (const line of console) {
    map.push(line.split(""));
}

let height = map.length;
let width = map[0].length;

let visits = new Set();

function findPosition() {
    for (let row = 0; row < height; row += 1) {
        for (let column = 0; column < width; column += 1) {
            const item = map[row][column];
            if ("^>v<".includes(item)) {
                return [row, column];
            }
        }
    }

    throw "Not found";
}

const nextMap = {
    "^": { rotation: ">", nextRowOffset: -1, nextColumnOffset: 0 },
    ">": { rotation: "v", nextRowOffset: 0, nextColumnOffset: +1 },
    "v": { rotation: "<", nextRowOffset: +1, nextColumnOffset: 0 },
    "<": { rotation: "^", nextRowOffset: 0, nextColumnOffset: -1 },
}

while (true) {
    const [row, column] = findPosition();
    visits.add(`${row}.${column}`);

    const item = map[row][column];

    const { rotation, nextRowOffset, nextColumnOffset } = nextMap[item];
    
    const nextCell = map[row + nextRowOffset]?.[column + nextColumnOffset];
    if (!nextCell) {
        // done
        break;
    } else if (nextCell === "#") {
        // rotate
        map[row][column] = rotation;
    } else {
        // move forward
        map[row][column] = ".";
        map[row + nextRowOffset][column + nextColumnOffset] = item;
    }
}

console.log(visits.size);
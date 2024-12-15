const map = [];
for await (let line of console) {
    if (!line) {
        break;
    }

    map.push(line
        .replaceAll("#", "##")
        .replaceAll("O", "[]")
        .replaceAll(".", "..")
        .replaceAll("@", "@.")
        .split("")
    );
}

let instructions = "";
for await (const line of console) {
    instructions += line;
}

const height = map.length;
const width = map[0].length;

// printMap("Initial state:", map);

let moveCount = 0;
for (const move of instructions) {
    let robotRow;
    let robotColumn;

    for (let row = 0; row < height; row += 1) {
        for (let column = 0; column < width; column += 1) {
            if (map[row][column] === "@") {
                robotRow = row;
                robotColumn = column;
            }
        }
    }

    if (move == "<") {
        moveHorizontal(map, -1, robotRow, robotColumn);
    } else if (move == ">") {
        moveHorizontal(map, +1, robotRow, robotColumn);
    } else if (move == "^") {
        moveVertical(map, -1, robotRow, [robotColumn]);
    } else if (move == "v") {
        moveVertical(map, +1, robotRow, [robotColumn]);
    }

    // printMap(`Move ${move}:`, map);
}

function moveHorizontal(map, direction, row, column) {
    const char = map[row][column];

    if (char === ".") {
        // empty space, don't need to do anything
        return true;
    }

    if (char === "#") {
        // can't move walls
        return false;
    }

    if (char === "[" || char === "]") {
        if(moveHorizontal(map, direction, row, column + 2 * direction)) {
            map[row][column + 2 * direction] = map[row][column + direction];
            map[row][column + direction] = map[row][column];
            map[row][column] = ".";
            return true;
        }
        return false;
        // right edge of a box
    } else if (char === "@") {
        if(moveHorizontal(map, direction, row, column + direction)) {
            map[row][column + direction] = "@";
            map[row][column] = ".";
            return true;
        }
        return false;
    }
}

function moveVertical(map, direction, row, columns) {
    if (columns.length === 0) return true;

    const nextRow = row + direction;

    let movedColumns = [];
    for (const i of columns) {
        const char = map[row][i];
        if (char === "#") {
            // can't move if there is a wall blocking
            return false;
        } else if (char === "[") {
            movedColumns.push(i, i + 1);
        } else if (char === "]") {
            movedColumns.push(i - 1, i);
        } else if (char === "@") {
            movedColumns.push(i);
        }
    }

    movedColumns = movedColumns.filter((v, i, arr) => arr.indexOf(v) === i); // unique elements

    if (!moveVertical(map, direction, nextRow, movedColumns)) {
        return false;
    }

    // move all the boxes up now
    for (const i of movedColumns) {
        map[nextRow][i] = map[row][i];
        map[row][i] = ".";
    }

    return true;
}

let result = 0;
for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
        if (map[row][column] === "[") {
            result += 100 * row + column;
        }
    }
}

console.log(result);

function printMap(instruction, map) {
    console.log(instruction);
    console.log(map.map(line => line.join("")).join("\n"));
    console.log("");
}
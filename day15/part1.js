const map = [];
for await (const line of console) {
    if (!line) {
        break;
    }

    map.push(line.split(""));
}

let instructions = "";
for await (const line of console) {
    instructions += line;
}

const height = map.length;
const width = map[0].length;

const directions = {
    "^": [-1, 0],
    "v": [+1, 0],
    "<": [0, -1],
    ">": [0, +1],
};

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

// printMap("Initial state:", map);

for (const move of instructions) {
    const [dRow, dColumn] = directions[move];

    let row = robotRow;
    let column = robotColumn;
    let boxCount = 0;
    while(true) {
        row += dRow;
        column += dColumn;

        if (map[row][column] === "#") {
            // wall
            break;
        } else if (map[row][column] === ".") {
            // empty space, we can shuffle
            map[robotRow][robotColumn] = ".";
            robotRow += dRow;
            robotColumn += dColumn;
            map[robotRow][robotColumn] = "@";
            if (boxCount > 0) {
                map[row][column] = "O"
            }
            break;
        } else if (map[row][column] === "O") {
            boxCount += 1;
        }
    }

    // printMap(`Move ${move}:`, map);
}

let result = 0;
for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
        if (map[row][column] === "O") {
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
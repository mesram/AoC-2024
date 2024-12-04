let rows = [];
for await (const line of console) {
    rows.push(line.split(""));
}

let width = rows[0].length;
let height = rows.length;

function match(char1, char2, char3) {
    return char1 === "M" && char2 === "A" && char3 === "S"
}

let count = 0;
for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
        if (rows[i][j] !== "X") {
            continue;
        }


        if (match(rows[i]?.[j + 1] ?? "", rows[i]?.[j + 2] ?? "", rows[i]?.[j + 3] ?? "")) { count += 1 }// right
        if (match(rows[i]?.[j - 1] ?? "", rows[i][j - 2] ?? "", rows[i]?.[j - 3] ?? "")) { count += 1 }// left
        if (match(rows[i - 1]?.[j] ?? "", rows[i - 2]?.[j] ?? "", rows[i - 3]?.[j] ?? "")) { count += 1 }// up
        if (match(rows[i + 1]?.[j] ?? "", rows[i + 2]?.[j] ?? "", rows[i + 3]?.[j] ?? "")) { count += 1 } // down
        if (match(rows[i - 1]?.[j - 1] ?? "", rows[i - 2]?.[j - 2] ?? "", rows[i - 3]?.[j - 3] ?? "")) { count += 1 }// up-left
        if (match(rows[i - 1]?.[j + 1] ?? "", rows[i - 2]?.[j + 2] ?? "", rows[i - 3]?.[j + 3] ?? "")) { count += 1 }// up-right
        if (match(rows[i + 1]?.[j - 1] ?? "", rows[i + 2]?.[j - 2] ?? "", rows[i + 3]?.[j - 3] ?? "")) { count += 1 }// down-left
        if (match(rows[i + 1]?.[j + 1] ?? "", rows[i + 2]?.[j + 2] ?? "", rows[i + 3]?.[j + 3] ?? "")) { count += 1 }// down-right
    }
}

console.log(count);
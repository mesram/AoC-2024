let rows = [];
for await (const line of console) {
    rows.push(line.split(""));
}

let width = rows[0].length;
let height = rows.length;

function match(char1, char2) {
    return (char1 === "M" && char2 === "S") || (char1 === "S" && char2 === "M")
}

let count = 0;
for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
        if (rows[i][j] !== "A") {
            continue;
        }

        if (
            match(rows[i - 1]?.[j - 1] ?? "", rows[i + 1]?.[j + 1] ?? "")
            && match(rows[i - 1]?.[j + 1] ?? "", rows[i + 1]?.[j - 1] ?? "")
        ) {
            count += 1;
        }
    }
}

console.log(count);
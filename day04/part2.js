import { arrayWindow2d } from "../utils/arrayWindow";

let rows = [];
for await (const line of console) {
    rows.push(line.split(""));
}

let count = 0;
for (const w of arrayWindow2d(rows, [3, 3])) {
    const diag1 = w[0][0] + w[1][1] + w[2][2];
    const diag2 = w[0][2] + w[1][1] + w[2][0];

    const tests = ["MAS", "SAM"];
    if (tests.includes(diag1) && tests.includes(diag2)) count += 1;
}
console.log(count);
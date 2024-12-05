import { arrayWindow2d } from "../utils/arrayWindow";

let rows = [];
for await (const line of console) {
    rows.push(line.split(""));
}

let count = 0;
for (const w of arrayWindow2d(rows, [4, 4], { overflow: true, emptyValue: "." })) {
    const right = w[0][0] + w[0][1] + w[0][2] + w[0][3]
    const down =  w[0][0] + w[1][0] + w[2][0] + w[3][0]
    const downRight =  w[0][0] + w[1][1] + w[2][2] + w[3][3]
    const downLeft =  w[0][3] + w[1][2] + w[2][1] + w[3][0]

    const tests = ["XMAS", "SAMX"];
    count += tests.includes(right) ? 1 : 0;
    count += tests.includes(down) ? 1 : 0;
    count += tests.includes(downRight) ? 1 : 0;
    count += tests.includes(downLeft) ? 1 : 0;
}
console.log(count);
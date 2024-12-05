import { arrayWindow2d } from "../utils/arrayWindow";

let rows = [];
for await (const line of console) {
    rows.push(line.split(""));
}

let count = 0;
for (const w of arrayWindow2d(rows, [4, 4], { overflow: true, emptyValue: "." })) {
    const [
        [ a1, a2, a3, a4,],
        [   ,   ,   ,   ,],
        [   ,   ,   ,   ,],
        [   ,   ,   ,   ,],
    ] = w;

    const [
        [ b1,   ,   ,   ,],
        [ b2,   ,   ,   ,],
        [ b3,   ,   ,   ,],
        [ b4,   ,   ,   ,],
    ] = w;

    const [
        [ c1,   ,   ,   ,],
        [   , c2,   ,   ,],
        [   ,   , c3,   ,],
        [   ,   ,   , c4,],
    ] = w;

    const [
        [   ,   ,   , d1,],
        [   ,   , d2,   ,],
        [   , d3,   ,   ,],
        [ d4,   ,   ,   ,],
    ] = w;

    const tests = ["XMAS", "SAMX"];
    count += tests.includes(a1 + a2 + a3 + a4) ? 1 : 0;
    count += tests.includes(b1 + b2 + b3 + b4) ? 1 : 0;
    count += tests.includes(c1 + c2 + c3 + c4) ? 1 : 0;
    count += tests.includes(d1 + d2 + d3 + d4) ? 1 : 0;
}
console.log(count);
import { arrayWindow2d } from "../utils/arrayWindow";

let rows = [];
for await (const line of console) {
    rows.push(line.split(""));
}

let count = 0;
for (const w of arrayWindow2d(rows, [3, 3])) {
    const [
        [ tl,   , tr,],
        [   , md,   ,],
        [ bl,   , br,],
    ] = w;

    const tests = ["MAS", "SAM"];
    if (tests.includes(tl + md + br) && tests.includes(tr + md + bl)) count += 1;
}
console.log(count);
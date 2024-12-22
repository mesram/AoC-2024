const digitsMap = [
    ["7", "8", "9"], // 0
    ["4", "5", "6"], // 1
    ["1", "2", "3"], // 3
    [" ", "0", "A"], // 3
];

const numberToDirMap: {[key: string]: string[]} = {
    "A0": ["<A"],
    "A1": ["^<<A", "<^<A"],
    "A2": ["^<A", "<^A"],
    "A3": ["^A"],
    "A4": ["^^<<A", "^<^<A", "<^^<A", "<^<^A"],
    "A5": ["^^<A", "^<^A", "<^^A"],
    "A6": ["^^A"],
    "A7": [
        "^^^<<A", 
        "^^<^<A", "^^<<^A",
        "^<^^<A", "^<^<^A", "^<<^^A",
        "<^^^<A", "<^^<^A", "<^<^^A",
    ],
    "A8": ["^^^<A", "<^^^A"],
    "A9": ["^^^A"],

    "0A": [">A"],
    "1A": ["v>>A", ">v>A"],
    "2A": ["v>A", ">vA"],
    "3A": ["vA"],
    "4A": ["v>v>A", ">vv>A", ">v>vA", ">>vvA"],
    "5A": [">vvA", "v>vA", "vv>A"],
    "6A": ["vvA"],
    "7A": [
        "vvv>>A", 
        "vv>v>A", "vv>>vA",
        "v>vv>A", "v>v>vA", "v>>vvA",
        ">vvv>A", ">vv>vA", ">v>vvA",
    ],
    "8A": ["vvv>A", ">vvvA"],
    "9A": ["vvvA"],


    // example
    "02": ["^A"],
    "17": ["^^A"],
    "29": ["^^>A", "^>^A", ">^^A"],
    "37": ["^^<<A", "^<^<A", "<^^<A", "<^<^A", "<<^^A"],
    "45": [">A"],
    "56": [">A"],
    "79": [">>A"],
    "98": ["<A"],

   // input
    "36": ["^A"],
    "40": [">vvA", "v>vA"],
    "48": ["^>A", ">^A"],
    "54": ["<A"],
    "65": ["<A"],
    "78": [">A"],
    "80": ["vvvA"],
    "83": [">vvA", "v>vA", "vv>A"],
    "89": [">A"],
    "96": ["vA"],
}

const directions1Map = [
    [" ", "^", "A"],
    ["<", "v", ">"],
];

const dirToDirMap: {[key: string]: string[]} = {
    "AA": ["A"],
    "A^": ["<A"],
    "A<": ["v<<A", "<v<A"],
    "Av": ["<vA", "v<A"],
    "A>": ["vA"],

    "^A": [">A"],
    "^^": ["A"],
    "^<": ["v<A"],
    "^v": ["vA"],
    "^>": [">vA", "v>A"],

    "<A": [">>^A", ">^>A"],
    "<^": [">^A"],
    "<<": ["A"],
    "<v": [">A"],
    "<>": [">>A"],

    ">A": ["^A"],
    ">^": ["^<A", "<^A"],
    "><": ["<<A"],
    ">v": ["<A"],
    ">>": ["A"],

    "vA": [">^A", "^>A"],
    "v^": ["^A"],
    "v<": ["<A"],
    "vv": ["A"],
    "v>": [">A"],
}

function expandString(str: string, map: {[key: string]: string[]}): string[] {
    let result = [""];

    let prev = "A";
    for (const char of str) {
        let options = map[prev + char];
        result = result.flatMap(val1 => options.map(val2 => val1 + val2))
        prev = char
    }

    return result
}

// 247604 too low
let total = 0;
for await (const input of (console as any)) {
    let strs = [input];
    strs = strs.flatMap(str => expandString(str, numberToDirMap));
    strs = strs.flatMap(str => expandString(str, dirToDirMap));
    strs = strs.flatMap(str => expandString(str, dirToDirMap));

    let lengths = strs.map(str => str.length);

    let num = parseInt(input, 10);
    let minLength = lengths.reduce((current, value) => Math.min(current, value), Number.MAX_SAFE_INTEGER);
    console.log(input, num, minLength);
    total += num * minLength;
}
console.log(total);



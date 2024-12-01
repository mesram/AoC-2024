let list1 = [];
let list2 = [];

for await (const line of console) {
    const [v1, v2] = line.split("   ");
    list1.push(Number(v1));
    list2.push(Number(v2));
}

const counts = {};
for (const value of list2) {
    counts[value] = (counts[value] ?? 0) + 1
}

let result = 0;
for (const value of list1) {
    result += value * (counts[value] ?? 0);
}

console.log(result);
let list1 = [];
let list2 = [];

for await (const line of console) {
    const [v1, v2] = line.split("   ");
    list1.push(Number(v1));
    list2.push(Number(v2));
}

list1.sort();
list2.sort();

let result = 0;
for (let i = 0; i < list1.length; i += 1) {
    result += Math.abs(list1[i] - list2[i]);
}

console.log(result);
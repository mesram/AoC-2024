const pairs = await Array.fromAsync(console).then(lines => lines.map(line => line.split("-")));

const map = {};

for (const [first, second] of pairs) {
    map[first] ??= new Set();
    map[second] ??= new Set();

    map[first].add(second);
    map[second].add(first);
}

const sets = [];
for (const key of Object.keys(map).sort()) {
    const connections = map[key];
    for (const set of sets) {
        let containsAll = true;
        for (const member of set) {
            if (!connections.has(member)) {
                containsAll = false;
                break;
            }
        }
        if (containsAll) {
            set.add(key);
        }
    }

    sets.push(new Set([key]));
}

let largestSet = sets.sort((a, b) => b.size - a.size)[0];
let password = [...largestSet].sort().join(',');
console.log(password);
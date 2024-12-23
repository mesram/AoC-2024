const pairs = await Array.fromAsync(console).then(lines => lines.map(line => line.split("-")));

const map = {};

for (const [first, second] of pairs) {
    map[first] ??= new Set();
    map[second] ??= new Set();

    map[first].add(second);
    map[second].add(first);
}

const sets = [];
for (const [key, connections] of Object.entries(map)) {
    for (const set of sets) {
        let containsAll = true;
        for (const member of set) {
            if (!connections.has(member)) {
                containsAll = false;
                break;
            }
        }

        if (containsAll) set.push(key);
    }

    sets.push([key]);
}

const largestSet = sets.sort((a, b) => b.length - a.length)[0];
const password = largestSet.sort().join(',');
console.log(password);
const pairs = await Array.fromAsync(console).then(lines => lines.map(line => line.split("-")));

const map = {};

for (const [first, second] of pairs) {
    map[first] ??= new Set();
    map[second] ??= new Set();

    map[first].add(second);
    map[second].add(first);
}

const computers = Object.keys(map).sort();
const results = [];
for (let i = 0; i < computers.length; i += 1) {
    const computer1 = computers[i];
    for (let j = i + 1; j < computers.length; j += 1) {
        const computer2 = computers[j];
        if (!map[computer1].has(computer2)) continue;
        for (let k = j + 1; k < computers.length; k += 1) {
            const computer3 = computers[k];
            if (!map[computer2].has(computer3) || !map[computer3].has(computer1)) continue;

            const all = [computer1, computer2, computer3];
            if (all.some(item => item.startsWith('t'))) {
                results.push(all.join(','))
            }
        }
    }
}

console.log(`Part1: ${results.length}`);
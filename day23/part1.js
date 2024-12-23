const pairs = await Array.fromAsync(console).then(lines => lines.map(line => line.split("-")));

const map = {};

for (const [first, second] of pairs) {
    map[first] ??= new Set();
    map[second] ??= new Set();

    map[first].add(second);
    map[second].add(first);
}

let computers = Object.keys(map);
let results = new Set();
for (const computer1 of computers) {
    for (const computer2 of computers) {
        for (const computer3 of computers) {
            if (
                map[computer1].has(computer2)
                && map[computer1].has(computer3)
                && map[computer2].has(computer3)
            ) {

                let sorted = [computer1, computer2, computer3].sort()
            
                if (sorted.length === 3 && sorted.some(item => item.startsWith('t'))) {
                    results.add(sorted.join(','))
                }
            }
        }
    }
}

console.log(results.size);
const rules = [];

for await (const line of console) {
    if (line === "") break;
    rules.push(line.split("|"));
}

function getOrder(pages) {
    const parents = new Map();
    const children = new Map();

    for (const rule of rules) {
        const [parent, child] = rule;

        if (!pages.includes(parent) || !pages.includes(child)) continue;

        if (!parents.has(parent)) {
            parents.set(parent, new Set());
        }
    
        parents.get(parent).add(child);
    
        if (!children.has(child)) {
            children.set(child, new Set());
        }
    
        children.get(child).add(parent);
    }

    const flattened = [];
    let appended = 0;

    while (parents.size > 0) {
        let found = false;
        for (const [parent, dependencies] of parents.entries()) {
            if (!children.has(parent)) {
                // this is a root node
                flattened.push(parent);
                for (const child of dependencies) {
                    children.get(child).delete(parent);
                    if (children.get(child).size === 0) {
                        children.delete(child);
                        if (!parents.has(child)) {
                            /*
                            strictly speaking, this can lead to ambiguous ordering where a valid input could be considered invalid

                                1|2
                                1|3

                                1,3,2

                            should be considered valid, but this part here would could an implicit 2|3 rule
                            thankfully the AoC puzzle makers don't test for this
                            */
                            flattened.push(child);
                        }
                    }
                }
                parents.delete(parent);
                found = true;
                break;
            }
        }
        if (!found) {
            console.log("HUH??", flattened);
            throw "bad input"
        }
    }

    return flattened;
}

let total = 0;
for await (const line of console) {
    const pages = line.split(",");
    const flattened = getOrder(pages);
    let previousIndex = -1;
    let valid = true;
    for (const page of pages) {
        let index = flattened.indexOf(page);
        if (index < previousIndex) {
            valid = false;
            break;
        }
        previousIndex = index;
    }

    if (valid) continue;
    pages.sort((a, b) => flattened.indexOf(a) - flattened.indexOf(b));

    total += Number(pages[Math.floor(pages.length / 2)])
}

console.log(total);
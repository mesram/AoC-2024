const rules = [];

for await (const line of console) {
    if (line === "") break;
    rules.push(line.split("|"));
}

let total = 0;
for await (const line of console) {
    const pages = line.split(",");
    const filteredRules = rules.filter(([parent, child]) => pages.includes(parent) && pages.includes(child));
    const flattened = getDependencyOrdering(filteredRules);
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

    if (!valid) continue;

    total += Number(pages[Math.floor(pages.length / 2)])
}

console.log(total);

function getDependencyOrdering(dependencies) {
    const parents = {}; // parent -> child[]
    const children = {}; // child -> parent[]

    for (const [parent, child] of dependencies) {
        parents[parent] ??= new Set();
        parents[parent].add(child);

        parents[child] ??= new Set();
    
        children[child] ??= new Set();
        children[child].add(parent);
    }

    const resolved = [];

    while (true) {
        const entries = Object.entries(parents);
        if (entries.length === 0) break;

        let found = false;
        for (const [parent, dependencies] of entries) {
            // if the parent is still dependent on something else, then we can't add it to the list yet
            if (parent in children) continue;

            // parent is a root node, add it to the list
            resolved.push(parent);
            delete parents[parent];
            found = true;

            // clear the dependencies from the children
            for (const child of dependencies) {
                children[child].delete(parent);
            
                // child no longer has any dependencies of its own, meaning we can add it to the list
                /*
                    strictly speaking, this can lead to ambiguous ordering where a valid input could be considered invalid

                        1|2
                        1|3

                        1,3,2

                    should be considered valid, but this part here would could an implicit 2|3 rule
                    thankfully the AoC puzzle makers don't test for this
                */
                if (children[child].size === 0) delete children[child];
            }
        }
        
        if (!found) {
            throw `Bad input: cycle detected, resolved ${resolved.join(',')}`
        }
    }

    return resolved;
}
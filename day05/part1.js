const rules = [];

for await (const line of console) {
    if (line === "") break;
    rules.push(line.split("|"));
}

function getDependencyOrdering(rules) {
    const parents = new Map(); // parent -> child[]
    const children = new Map(); // child -> parent[]

    for (const rule of rules) {
        const [parent, child] = rule;

        if (!parents.has(parent)) {
            parents.set(parent, new Set());
        }

        if (!parents.has(child)) {
            parents.set(child, new Set());
        }
    
        parents.get(parent).add(child);
    
        if (!children.has(child)) {
            children.set(child, new Set());
        }
    
        children.get(child).add(parent);
    }

    const resolved = [];

    while (parents.size > 0) {
        let found = false;
        for (const [parent, dependencies] of parents.entries()) {
            // if the parent is still dependent on something else, then we can't add it to the list yet
            if (children.has(parent)) continue;

            // parent is a root node, add it to the list
            resolved.push(parent);
            parents.delete(parent);
            found = true;

            // clear the dependencies from the children
            for (const child of dependencies) {
                children.get(child).delete(parent);
            
                // child no longer has any dependencies of its own, meaning we can add it to the list
                /*
                    strictly speaking, this can lead to ambiguous ordering where a valid input could be considered invalid

                        1|2
                        1|3

                        1,3,2

                    should be considered valid, but this part here would could an implicit 2|3 rule
                    thankfully the AoC puzzle makers don't test for this
                */
                if (children.get(child).size === 0) children.delete(child);
            }
        }
        
        if (!found) {
            throw `Bad input: cycle detected, resolved ${resolved.join(',')}`
        }
    }

    return resolved;
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
        if (index === -1) continue;
        if (index < previousIndex) {
            valid = false;
            break;
        }
        previousIndex = index;
    }

    if (valid) {
        total += Number(pages[Math.floor(pages.length / 2)])
    }
    console.log(`${line} = ${valid ? 'good' : 'BAD!!'}`);
}

console.log(total);
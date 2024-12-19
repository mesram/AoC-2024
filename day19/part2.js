const [patternsLine, , ...tests] = await Array.fromAsync(console);

let patterns = patternsLine.split(", ").sort((a, b) => {
    return b.length - a.length
});

let redundantPatterns = [];
for (let i = 0; i < patterns.length; i += 1) {
    const otherPatterns = patterns.filter((p, index) => index > i);
    if (canMakePattern(patterns[i], otherPatterns)) {
        redundantPatterns.push(i);
    }
}

const minimalPatterns = patterns.filter((p, i) => redundantPatterns.indexOf(i) === -1);

let cache = { "": 1 };
function enumeratePatterns(test, patterns) {
    if (test in cache) { return cache[test]; }
    let total = 0;
    for (const pattern of patterns) {
        if (!test.startsWith(pattern)) continue;
        total += enumeratePatterns(test.substring(pattern.length), patterns);
    }

    cache[test] = total;
    return total;
}

let total = 0;
for (const test of tests) {
    if (!canMakePattern(test, minimalPatterns)) continue;

    let possiblePatterns = patterns.filter(pattern => test.indexOf(pattern) !== -1);
    let count = enumeratePatterns(test, possiblePatterns);
    total += count;
}

console.log(total);

function canMakePattern(test, patterns) {
    if (test === "") return true;
    for (const pattern of patterns) {
        if (!test.startsWith(pattern)) continue;
        if (canMakePattern(test.substring(pattern.length), patterns)) {
            return true;
        }
    }
}


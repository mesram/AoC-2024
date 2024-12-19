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

patterns = patterns.filter((p, i) => redundantPatterns.indexOf(i) === -1);

let total = 0;
for (const test of tests) {
    if (canMakePattern(test, patterns)) {
        console.log(`${test} YES`)
        total += 1;
    } else {
        console.log(`${test} no`)
    }
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
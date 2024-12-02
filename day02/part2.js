function isSafe(report) {
    let [previous, ...levels] = report

    let increasing = true;
    let decreasing = true;
    let minDelta = Number.MAX_SAFE_INTEGER;
    let maxDelta = 0;

    for (const level of levels) {
        const delta = level - previous;

        increasing = increasing && delta > 0;
        decreasing = decreasing && delta < 0;
        maxDelta = Math.max(maxDelta, Math.abs(delta));
        minDelta = Math.min(minDelta, Math.abs(delta));  
        
        previous = level;
    }

    return (increasing || decreasing) && minDelta >= 1 && maxDelta <= 3;
}

let safeCount = 0;
for await (const line of console) {
    const report = line.split(" ").map(Number);
    
    for (let i = -1; i < report.length; i += 1) {
        let permutation = report.filter((_, index) => index !== i);
        if (isSafe(permutation)) {
            safeCount += 1;
            break;
        }
    }
}

console.log(safeCount);
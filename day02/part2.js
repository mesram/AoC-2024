function isSafe(report) {
    let increasing = true;
    let decreasing = true;
    let inRange = true;

    for (let i = 1; i < report.length; i++) {
        const delta = report[i] - report[i - 1];

        increasing = increasing && delta > 0;
        decreasing = decreasing && delta < 0;
        inRange = inRange && Math.abs(delta) >=1 && Math.abs(delta) <= 3;
    }

    return (increasing || decreasing) && inRange;
}

let safeCount = 0;
for await (const line of console) {
    const report = line.split(" ").map(Number);
    
    for (let i = 0; i < report.length; i += 1) {
        let permutation = report.filter((_, index) => index !== i);
        if (isSafe(permutation)) {
            safeCount += 1;
            break;
        }
    }
}

console.log(safeCount);
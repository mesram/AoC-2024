function isSafe(report) {
    let [previous, ...levels] = report
    let safe = true;
    let increasing = null;
    for (const level of levels) {
        const delta = level - previous;
        if (increasing !== null && increasing !== delta > 0) {
            safe = false;
            break;
        }

        increasing = delta > 0;

        if (Math.abs(delta) < 1 || Math.abs(delta) > 3) {
            safe = false;
            break;
        }

        previous = level;    
    }

    return safe;
}

let safeCount = 0;
for await (const line of console) {
    const report = line.split(" ").map(Number);

    if (isSafe(report)) {
        safeCount += 1;
    }
}

console.log(safeCount);
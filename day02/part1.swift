func isSafe(_ report: [Int]) -> Bool {
    var isIncreasing = true
    var isDecreasing = true
    var inRange = true
    for i in 1..<report.count {
        let value = report[i]
        let previous = report[i - 1]

        let difference = value - previous
        isIncreasing = isIncreasing && difference > 0
        isDecreasing = isDecreasing && difference < 0
        inRange = inRange && (1...3).contains(abs(difference))
    }
    return (isIncreasing || isDecreasing) && inRange
}

var safeCount = 0
while let line = readLine() {
    let report = line.split(separator: " ").map { Int($0)! }
    if isSafe(report) {
        safeCount += 1
    }
}

print(safeCount)
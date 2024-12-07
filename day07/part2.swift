var total = 0
while let line = readLine() {
    let pieces = line.split(separator: ": ")
    let target = Int(pieces[0])!
    let numbers = pieces[1].split(separator: " ").map { Int($0)!}

    if (matches(target: target, numbers: numbers, i: 1, currentValue: numbers[0])) {
        total += target
    }
}

print(total)

func matches(target: Int, numbers: [Int], i: Int, currentValue: Int) -> Bool {
    if (i == numbers.count) {
        return currentValue == target
    }

    let num = numbers[i]

    return matches(target: target, numbers: numbers, i: i + 1, currentValue: currentValue + num)
        || matches(target: target, numbers: numbers, i: i + 1, currentValue: currentValue * num)
        || matches(target: target, numbers: numbers, i: i + 1, currentValue: Int("\(currentValue)\(num)")!)
}
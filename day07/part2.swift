var total = 0
while let line = readLine() {
    let pieces = line.split(separator: ": ")
    let target = Int(pieces[0])!
    let numbers = pieces[1].split(separator: " ").map { Int($0)! }

    if (matches(target, numbers.dropFirst(), numbers.first!)) {
        total += target
    }
}

print(total)

func matches(_ target: Int, _ numbers: ArraySlice<Int>, _ currentValue: Int) -> Bool {
    guard let num = numbers.first else {
        return currentValue == target
    }

    let nextSequence = numbers.dropFirst()

    return matches(target, nextSequence, currentValue + num)
        || matches(target, nextSequence, currentValue * num)
        || matches(target, nextSequence, Int("\(currentValue)\(num)")!)
}
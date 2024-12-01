var list1: [Int] = []
var list2: [Int] = []

while let line = readLine() {
    let pieces = line.split(separator: "   ")
    list1.append(Int(pieces[0])!)
    list2.append(Int(pieces[1])!)
}

var counts: [Int: Int] = [:]
for value in list2 {
    counts[value] = (counts[value] ?? 0) + 1
}

var result = 0
for value in list1 {
    result += value * (counts[value] ?? 0)
}

print(result)
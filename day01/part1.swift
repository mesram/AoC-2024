var list1: [Int] = []
var list2: [Int] = []

while let line = readLine() {
    let pieces = line.split(separator: "   ")
    list1.append(Int(pieces[0])!)
    list2.append(Int(pieces[1])!)
}

list1.sort()
list2.sort()

var result = 0
for i in 0..<list1.count {
    result += abs(list1[i] - list2[i])
}

print(result)
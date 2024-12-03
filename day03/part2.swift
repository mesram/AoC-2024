var total = 0
var enabled = true
while let line = readLine() {
    let expression = #/(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/#
    for match in line.matches(of: expression) {
        switch match.output.0 {
            case "do()": enabled = true
            case "don't()": enabled = false
            default: if (enabled) { total += Int(match.output.2!)! * Int(match.output.3!)! }
        }
    }
}

print(total)
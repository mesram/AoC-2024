var total = 0

while let line = readLine() {
    let expression = #/mul\((\d{1,3}),(\d{1,3})\)/#
    for match in line.matches(of: expression) {
        total += Int(match.output.1)! * Int(match.output.2)! 
    }
}

print(total)
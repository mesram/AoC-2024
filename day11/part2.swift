var stones = readLine()!.split(separator: " ").reduce(into: [String: Int]()) {
    let stone = String($1)
    $0[stone] = ($0[stone] ?? 0) + 1
}

for _ in 0..<75 {
    stones = blink(viewing: stones)
}

print(stones.values.reduce(0, +))

func blink(viewing stones: [String: Int]) -> [String: Int] {
    return stones.reduce(into: [String: Int]()) {
        for stone in updateStone($1.0) {
            $0[stone] = ($0[stone] ?? 0) + $1.1
        }
    }
}

func updateStone(_ stone: String) -> [String] {
    if stone == "0" {
        return ["1"]
    }
    if stone.count % 2 == 0 {
        return [
            String(Int(stone.prefix(stone.count / 2))!),
            String(Int(stone.suffix(stone.count / 2))!)
        ]
    }
    return [String(Int(stone)! * 2024)]
}
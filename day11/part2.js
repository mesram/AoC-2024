let stones;
for await (const line of console) {
    stones = Object.fromEntries(line.split(" ").map(stone => [stone, 1]));
    break;
}

for (let i = 0; i < 75; i += 1) {
    stones = blink(stones);
}

console.log(Object.values(stones).reduce((t, v) => t + v, 0));

function blink(stones) {
    const result = {}
    for (const [stone, count] of Object.entries(stones)) {
        for (const s of updateStone(stone)) {
            result[s] ??= 0
            result[s] += count
        }
    }
    return result
}

function updateStone(stone) {
    if (stone === "0") {
        return ["1"];
    } else if (stone.length % 2 === 0) {
        return [
            String(Number(stone.substring(0, stone.length / 2))),
            String(Number(stone.substring(stone.length / 2))),
        ];
    } else {
        return [String(Number(stone) * 2024)];
    }
}
let stones;
for await (const line of console) {
    stones = line.split(" ");
    break;
}

for (let i = 0; i < 25; i += 1) {
    stones = stones.flatMap(stone => updateStone(stone));
}

console.log(stones.length);

function updateStone(stone) {
    if (stone === "0") {
        return ["1"];
    } else if (stone.length % 2 === 0) {
        return [
            String(Number(stone.substring(0, stone.length / 2))),
            String(Number(stone.substring(stone.length / 2))),
        ];
    } else {
        return String(Number(stone) * 2024);
    }
}
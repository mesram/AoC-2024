for await (const line of console) {
    const cache = {};
    let total = line.split(" ").reduce((total, stone) => total + getStoneCount(stone, cache, 75), 0);
    console.log(total);
    break;
}

function getStoneCount(stone, cache, iterCount) {
    if (iterCount === 0) return 1;

    const cacheKey = `${iterCount}.${stone}`;
    cache[cacheKey] ??= updateStone(stone).reduce((total, stone) => total + getStoneCount(stone, cache, iterCount - 1), 0);
    return cache[cacheKey];
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
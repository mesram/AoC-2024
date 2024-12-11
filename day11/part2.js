const iterationsCache = [];

for await (const line of console) {
    let total = 0;
    for (const stone of line.split(" ")) {
        total += updateStone(stone, 75);
    }
    console.log(total);
    break;
}

function updateStone(stone, iterCount) {
    if (iterCount === 0) {
        return 1;
    }

    iterationsCache[iterCount - 1] ??= {};
    const cache = iterationsCache[iterCount - 1];

    if (!(stone in cache)) {
        if (stone === "0") {
            cache[stone] = updateStone("1", iterCount - 1);
        } else if (stone.length % 2 === 0) {
            const leftStone = String(Number(stone.substring(0, stone.length / 2)));
            const rightStone = String(Number(stone.substring(stone.length / 2)));

            cache[stone] = updateStone(leftStone, iterCount - 1) + updateStone(rightStone, iterCount - 1);
        } else {
            let updated = String(Number(stone) * 2024);
            cache[stone] = updateStone(updated, iterCount - 1);
        }
    }

    return cache[stone];
}
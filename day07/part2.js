let total = 0;
for await (const line of console) {
    const pieces = line.split(": ");
    const target = Number(pieces[0]);
    const numbers = pieces[1].split(" ").map((n) => Number(n));

    if (matches(target, numbers, 1, numbers[0])) {
        total += target;
    }
}

console.log(total);

function matches(target, numbers, i, currentValue) {
    if (i === numbers.length) {
        return currentValue === target;
    }

    let val = numbers[i]

    return matches(target, numbers, i + 1, currentValue + val)
        || matches(target, numbers, i + 1, currentValue * val)
        || matches(target, numbers, i + 1, Number(`${currentValue}${val}`))
    ;
}
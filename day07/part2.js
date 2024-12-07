let total = 0;
for await (const line of console) {
    const pieces = line.split(": ");
    const target = Number(pieces[0]);
    const [first, ...numbers] = pieces[1].split(" ").map((n) => Number(n));

    if (matches(target, numbers, first)) {
        total += target;
    }
}

console.log(total);

function matches(target, numbers, currentValue) {
    if (numbers.length === 0) {
        return currentValue === target;
    }

    const [val, ...rest] = numbers

    return matches(target, rest, currentValue + val)
        || matches(target, rest, currentValue * val)
        || matches(target, rest, Number(`${currentValue}${val}`));
}
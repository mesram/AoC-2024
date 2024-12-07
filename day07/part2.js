let total = 0;
for await (const line of console) {
    console.log(line);
    const pieces = line.split(": ");
    const target = Number(pieces[0]);
    const numbers = pieces[1].split(" ").map((n) => Number(n));

    if (matches(target, numbers)) {
        total += target;
    }
}

console.log(total);

function matches(target, numbers) {
    if (numbers.length === 1) {
        return numbers[0] === target;
    }

    const [left, right, ...remaining] = numbers;
    return matches(target, [left + right, ...remaining])
        || matches(target, [left * right, ...remaining])
        || matches(target, [Number("" + left + right), ...remaining]);
}
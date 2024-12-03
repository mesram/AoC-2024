let total = 0;

for await (const line of console) {
    const expression = new RegExp("mul\\((\\d{1,3}),(\\d{1,3})\\)", "g");
    for (const [_, num1, num2] of line.matchAll(expression)) {
        total += Number(num1) * Number(num2);
    }
}

console.log(total);
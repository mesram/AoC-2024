let total = 0;

for await (const line of console) {
    const regex = new RegExp("mul\\((\\d{1,3}),(\\d{1,3})\\)", "g");
    while (true) {
        const match = regex.exec(line);
        if (!match) break;
        const [wholeMatch, num1, num2] = match;
        total += Number(num1) * Number(num2);
    }
}

console.log(total);
let total = 0;
let enabled = true;
for await (const line of console) {
    const expression = new RegExp(`do\\(\\)|don't\\(\\)|mul\\((\\d{1,3}),(\\d{1,3})\\)`, "g");
    for (const [wholeMatch, num1, num2] of line.matchAll(expression)) {
        switch (wholeMatch) {
            case "do()": enabled = true; continue;
            case "don't()": enabled = false; continue;
            default: if (enabled) { total += Number(num1) * Number(num2); }
        }
    }
}

console.log(total);
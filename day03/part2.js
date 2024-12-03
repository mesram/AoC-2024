let total = 0;

let enabled = true;
for await (const line of console) {
    const doExpression = "do\\(\\)"
    const dontExpression = "don't\\(\\)"
    const mulExpression = "mul\\((\\d{1,3}),(\\d{1,3})\\)"
    const regex = new RegExp(`(${doExpression}|${dontExpression}|${mulExpression})`, "g");
    while (true) {
        const match = regex.exec(line);
        if (!match) break;
        const [wholeMatch, sub, num1, num2] = match;

        if (wholeMatch === "do()") {
            enabled = true;
        } else if (wholeMatch === "don't()") {
            enabled = false;
        } else if (enabled) {
            total += Number(num1) * Number(num2);
        }
    }
}

console.log(total);
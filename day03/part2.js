let total = 0;

let enabled = true;
for await (const line of console) {
    const doExpression = "do\\(\\)"
    const dontExpression = "don't\\(\\)"
    const mulExpression = "mul\\((\\d{1,3}),(\\d{1,3})\\)"
    const expression = new RegExp(`${doExpression}|${dontExpression}|${mulExpression}`, "g");
    for (const [wholeMatch, num1, num2] of line.matchAll(expression)) {
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
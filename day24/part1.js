const values = {}

for await (const line of console) {
    if (line === "") break;
    const [name, value] = line.split(": ");
    values[name] = value === "1";
}


const unresolvedOutputs = {}

const decoder = new RegExp("(...) (AND|XOR|OR) (...) -> (...)");
for await (const line of console) {
    const [, input1, command, input2, output] = line.match(decoder);
    unresolvedOutputs[output] = [command, input1, input2];
}

while (Object.keys(unresolvedOutputs).length > 0) {
    resolve(Object.keys(unresolvedOutputs)[0], values);
}

function resolve(output, values) {
    if (output in values) return values[output];
    const [command, input1, input2] = unresolvedOutputs[output];

    let value1 = resolve(input1, values);
    let value2 = resolve(input2, values);

    if (command === "AND") {
        values[output] = value1 && value2;
    } else if (command === "XOR") {
        values[output] = value1 !== value2;
    } else if (command === "OR") {
        values[output] = value1 || value2;
    }

    delete unresolvedOutputs[output];

    return values[output];
}

let outputs = Object.keys(values).filter(name => name.startsWith("z")).sort().reverse();
let result = 0;
for (const name of outputs) {
    result = result * 2 + (values[name] ? 1 : 0);
}

console.log(result);

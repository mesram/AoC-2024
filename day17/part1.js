const [lineA, lineB, lineC, , lineProgram] = await Array.fromAsync(console);

let [, registerA] = new RegExp("Register A: (\\d+)", "g").exec(lineA);
let [, registerB] = new RegExp("Register B: (\\d+)", "g").exec(lineB);
let [, registerC] = new RegExp("Register C: (\\d+)", "g").exec(lineC);

let instructions = new RegExp("Program: (.*)", "g").exec(lineProgram)[1].split(",").map(Number);

// console.log(registerA, registerB, registerC, instructions);

let PC = 0;
let OUT = [];

const literal = (operand) => operand;
const combo = (operand) => {
    switch (operand) {
        case 0:
        case 1:
        case 2:
        case 3:
            return operand;
        case 4: return registerA;
        case 5: return registerB;
        case 6: return registerC;
        case 7: throw "Operand 7 used"; 
    }

    throw `Unknown combo operand ${operand}`;
}

const opcodes = {
    "adv": (op) => { 
        const numerator = registerA;
        const denominator = Math.pow(2, combo(op));
        registerA = Math.floor(numerator / denominator);
    },
    "bxl": (op) => {
        registerB = registerB ^ literal(op);
    },
    "bst": (op) => {
        registerB = combo(op) % 8;
    },
    "jnz": (op) => {
        if (registerA === 0) return;

        PC = literal(op);
        PC -= 2; // counteract the increase on the loop
    },
    "bxc": (op) => {
        registerB = registerB ^ registerC;
    },
    "out": (op) => {
        OUT.push(combo(op) % 8);
    },
    "bdv": (op) => {
        const numerator = registerA;
        const denominator = Math.pow(2, combo(op));
        registerB = Math.floor(numerator / denominator);
    },
    "cdv": (op) => {
        const numerator = registerA;
        const denominator = Math.pow(2, combo(op));
        registerC = Math.floor(numerator / denominator);
    },
};

const opcodeMap = [
    "adv",
    "bxl",
    "bst",
    "jnz",
    "bxc",
    "out",
    "bdv",
    "cdv",
];

for (PC = 0; PC < instructions.length; PC += 2) {
    const opcode = opcodeMap[instructions[PC]];
    const operand = instructions[PC + 1];

    // console.log(`${opcode} ${operand}`);

    opcodes[opcode](operand);
}

console.log(OUT.join(","));
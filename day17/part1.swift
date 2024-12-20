let lineA = readLine()!
let lineB = readLine()!
let lineC = readLine()!
_ = readLine()
let lineProgram = readLine()!

var registerA = try! UInt(#/Register A: (\d+)/#.wholeMatch(in: lineA)!.output.1)!
var registerB = try! UInt(#/Register B: (\d+)/#.wholeMatch(in: lineB)!.output.1)!
var registerC = try! UInt(#/Register C: (\d+)/#.wholeMatch(in: lineC)!.output.1)!

let instructions = try! #/Program: (.*)/#.wholeMatch(in: lineProgram)!.output.1.split(separator: ",").map { UInt($0)! }

// console.log(registerA, registerB, registerC, instructions);

var PC = 0;
var OUT = [UInt]();

let literal = { (operand: UInt) in operand }
let combo = { (operand: UInt) in
    switch (operand) {
        case 0: fallthrough
        case 1: fallthrough
        case 2: fallthrough
        case 3: return operand;
        case 4: return registerA;
        case 5: return registerB;
        case 6: return registerC;
        case 7: fatalError("Operand 7 used"); 
        default: fatalError("Unknown combo operand \(operand)")
    }
}

let comboThings = [
    "0", "1", "2", "3", "regA", "regB", "regC"
]

let opcodes: [String: (UInt) -> Void] = [
    "adv": { op in 
        print("regA = regA >> \(comboThings[Int(op)])")
        registerA = registerA >> combo(op);
    },
    "bxl": { op in
        print("regB = regB ^ \(op)")
        registerB = registerB ^ literal(op);
    },
    "bst": { op in
        print("regB = \(comboThings[Int(op)]) % 8")
        registerB = combo(op) % 8;
    },
    "jnz": { op in
        // fatalError("Jump \(op)")
        if (registerA == 0) { return }

        PC = Int(literal(op));
        PC -= 2; // counteract the increase on the loop
    },
    "bxc": { op in
        print("regB = regB ^ regC")
        registerB = registerB ^ registerC;
    },
    "out": { op in
        print("PRINT \(comboThings[Int(op)])")
        OUT.append(combo(op) % 8);
    },
    "bdv": { op in
        print("regB = regA >> \(comboThings[Int(op)])")
        registerB = registerA >> combo(op);
    },
    "cdv": { op in
        print("regC = regA >> \(comboThings[Int(op)])")
        registerC = registerA >> combo(op);
    },
];

let opcodeMap = [
    "adv",
    "bxl",
    "bst",
    "jnz",
    "bxc",
    "out",
    "bdv",
    "cdv",
];

while PC < instructions.count {
    let opcode = opcodeMap[Int(instructions[PC])];
    let operand = instructions[PC + 1];

    opcodes[opcode]!(operand);

    PC += 2
}

print(OUT.map(String.init).joined(separator: ","));
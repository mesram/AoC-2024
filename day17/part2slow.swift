let initA = try! UInt(#/Register A: (\d+)/#.wholeMatch(in: readLine()!)!.output.1)!
let initB = try! UInt(#/Register B: (\d+)/#.wholeMatch(in: readLine()!)!.output.1)!
let initC = try! UInt(#/Register C: (\d+)/#.wholeMatch(in: readLine()!)!.output.1)!

_ = readLine()

let instructions = try! #/Program: (.*)/#.wholeMatch(in: readLine()!)!.output.1.split(separator: ",").map { UInt($0)! }

var PC = 0;
var OUT = [UInt]();

var registerA = initA
var registerB = initB
var registerC = initC

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

let opcodes: [String: (UInt) -> Void] = [
    "adv": { op in 
        registerA = registerA >> combo(op);
    },
    "bxl": { op in
        registerB = registerB ^ literal(op);
    },
    "bst": { op in
        registerB = combo(op) % 8;
    },
    "jnz": { op in
        if (registerA == 0) { return }

        PC = Int(literal(op));
        PC -= 2; // counteract the increase on the loop
    },
    "bxc": { op in
        registerB = registerB ^ registerC;
    },
    "out": { op in
        OUT.append(combo(op) % 8);
    },
    "bdv": { op in
        registerB = registerA >> combo(op);
    },
    "cdv": { op in
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


for i in 0..<UInt.max {
    PC = 0;
    OUT = [UInt]();

    registerA = i
    registerB = initB
    registerC = initC

    while PC < instructions.count {
        let opcode = opcodeMap[Int(instructions[PC])];
        let operand = instructions[PC + 1];

        opcodes[opcode]!(operand);

        PC += 2
    }

    if OUT == instructions {
        print("Got result \(i)")
        break
    }
}
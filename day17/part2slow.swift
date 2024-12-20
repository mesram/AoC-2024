let initA = try! UInt(#/Register A: (\d+)/#.wholeMatch(in: readLine()!)!.output.1)!
let initB = try! UInt(#/Register B: (\d+)/#.wholeMatch(in: readLine()!)!.output.1)!
let initC = try! UInt(#/Register C: (\d+)/#.wholeMatch(in: readLine()!)!.output.1)!
_ = readLine()
let instructions = try! #/Program: (.*)/#.wholeMatch(in: readLine()!)!.output.1.split(separator: ",").map { UInt($0)! }

struct CPU {
    var PC: UInt
    var OUT: [UInt]
    var registerA: UInt
    var registerB: UInt
    var registerC: UInt

    init(registerA: UInt, registerB: UInt, registerC: UInt) {
        self.PC = 0
        self.OUT = []
        self.registerA = registerA
        self.registerB = registerB
        self.registerC = registerC
    }

    func combo(_ operand: UInt) -> UInt {
        switch (operand) {
            case 0: 0
            case 1: 1
            case 2: 2
            case 3: 3
            case 4: registerA
            case 5: registerB
            case 6: registerC
            default: fatalError("Unknown combo operand \(operand)")
        }
    }

    func literal(_ operand: UInt) -> UInt {
        operand
    }

    mutating func update(opcode: OpCode, operand: UInt) -> Void {
        switch (opcode) {  
        case .adv:
            registerA = registerA >> combo(operand)
            PC += 2
        case .bxl:
            registerB = registerB ^ literal(operand)
            PC += 2
        case .bst:
            registerB = combo(operand) % 8
            PC += 2
        case .jnz:
            PC = registerA == 0 ? PC + 2 : literal(operand)
        case .bxc:
            registerB = registerB ^ registerC
            PC += 2
        case .out:
            OUT.append(combo(operand) % 8)
            PC += 2
        case .bdv:
            registerB = registerA >> combo(operand)
            PC += 2
        case .cdv:
            registerC = registerA >> combo(operand)
            PC += 2
        }
    }
}

enum OpCode: UInt {
    case adv = 0
    case bxl
    case bst
    case jnz
    case bxc
    case out
    case bdv
    case cdv
}

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

var context = CPU(registerA: initA, registerB: initB, registerC: initC)

while context.PC < instructions.count - 1 {
    context.update(
        opcode: OpCode(rawValue: instructions[Int(context.PC)])!,
        operand: instructions[Int(context.PC + 1)]
    )
}

for i in 0..<UInt.max {
    var context = CPU(registerA: i, registerB: initB, registerC: initC)

    while context.PC < instructions.count - 1 {
        context.update(
            opcode: OpCode(rawValue: instructions[Int(context.PC)])!,
            operand: instructions[Int(context.PC + 1)]
        )
    }   

    if context.OUT == instructions {
        print("Got result \(i)")
        break
    }
}
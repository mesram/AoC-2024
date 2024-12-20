// 2,4 // bst       regB = regA % 8
// 1,3 // bxl       regB = regB XOR 3
// 7,5 // cdv       regC = regA >> regB      
// 4,7 // bxc       regB = regB XOR regC
// 0,3 // adv       regA = regA >> 3       // divide by 8
// 1,5 // bxl       regB = regB XOR 5
// 5,5 // out       PRINT regB % 8
// 3,0 // jnz    repeat while regA > 0

// 2,4,1,3,7,5,4,7,0,3,1,5,5,5,3,0


import Foundation

actor Printer {
    var result: UInt? = nil

    func update(id: UInt, value: UInt) async -> Bool {
        if let result {
            if value > result {
                return false
            }
            return true
        }

        print("\(id): \(value)")
        return true
    }

    func complete(id: UInt, value: UInt) async {
        print("\(id) found \(value) !!!")
        if result == nil || value < result! {
            result = value
        }
    }
}

print(ProcessInfo.processInfo.processorCount)

func testAsync(_ id: UInt, _ step: UInt, _ printer: Printer) async {
    // there are 16 numbers to output, each being the last 3 bits of regA
    // meaning that registerA is somewhere between 2^46 and 2^48
    // start at 2^46 and run a loop-unrolled version of the program, bailing early as soon as a "print" doesn't match the expect value
    var outer = 1 << 46 + id
    while await printer.update(id: id, value: outer) {
        for i in stride(from: 0, to: 10_000_000_000, by: Int(step)) {
            var regA = outer + UInt(i)
            var regB = UInt(0)
            var regC = UInt(0)

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 2) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 4) {
                continue
            }

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 1) {
                continue
            }  

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 3) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 7) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 5) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 4) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 7) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 0) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 3) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 1) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 5) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 5) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 5) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 3) {
                continue
            }   

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if (regB % 8 != 0) {
                continue
            }   

            await printer.complete(id: id, value: outer + UInt(i))
            return
        }

        outer += 10_000_000_000
    }
}

let threadCount = UInt(ProcessInfo.processInfo.processorCount - 2)

let printer = Printer()

await withTaskGroup(of: Void.self) { group in
    for i in 0..<threadCount{
        group.addTask {
            return await testAsync(i, threadCount, printer)
        }
    }
}
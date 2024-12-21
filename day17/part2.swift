// 2,4 // bst       regB = regA % 8
// 1,3 // bxl       regB = regB XOR 3
// 7,5 // cdv       regC = regA >> regB      
// 4,7 // bxc       regB = regB XOR regC
// 0,3 // adv       regA = regA >> 3       // divide by 8
// 1,5 // bxl       regB = regB XOR 5
// 5,5 // out       PRINT regB % 8
// 3,0 // jnz    repeat while regA > 0

// 2,4,1,3,7,5,4,7,0,3,1,5,5,5,3,0

func inputs(giving output: UInt, remainders: [UInt]) -> [UInt] {
    var result = [UInt]()

    for remainder in remainders {
        for i: UInt in 0..<8 {
            let test = remainder << 3 + i
            // regA will be >> by 3 bits for the next cycle, meaning that valid inputs to the current cycle are all the remainders << 3 with the lost information filled
            var regA = test
            var regB = UInt(0)
            var regC = UInt(0)

            regB = regA % 8
            regB = regB ^ 3
            regC = regA >> regB
            regB = regB ^ regC
            regA = regA >> 3
            regB = regB ^ 5

            if regB % 8 == output {
                result.append(test)
            }
        }

    }

    return result
}

func resolve(outputs: [UInt]) -> [UInt] {
    var result: [UInt] = [0]

    for output in outputs.reversed() {
        result = inputs(giving: output, remainders: result)
    }

    return result
}


print(resolve(outputs: [2,4,1,3,7,5,4,7,0,3,1,5,5,5,3,0]))
func nextSecret(_ secret: Int) -> Int {
    var secret = secret
    secret = (secret ^ (secret * 64))   % 16777216
    secret = (secret ^ (secret / 32))   % 16777216
    secret = (secret ^ (secret * 2048)) % 16777216
    return secret
}

// I wish tuples of hashable items were hashable...
struct SellSequence: Hashable {
    let diff1: Int
    let diff2: Int
    let diff3: Int
    let diff4: Int
}

func sellSequences(_ secret: Int, _ iterations: Int) -> [SellSequence: Int] {
    var secret = secret

    var sellPrices = [secret % 10]
    for _ in 0..<iterations {
        secret = nextSecret(secret)
        sellPrices.append(secret % 10)
    }

    var sequences = [SellSequence: Int]()
    for i in stride(from: 0, to: sellPrices.count - 4, by: 1) {
        let sequence = SellSequence(
            diff1: sellPrices[i + 1] - sellPrices[i], 
            diff2: sellPrices[i + 2] - sellPrices[i + 1], 
            diff3: sellPrices[i + 3] - sellPrices[i + 2], 
            diff4: sellPrices[i + 4] - sellPrices[i + 3]
        )
        if sequences[sequence] == nil { 
            sequences[sequence] = sellPrices[i + 4] 
        }
    }

    return sequences
}


var sequenceTotals = [SellSequence: Int]()

while let line = readLine() {
    for (sequence, price) in sellSequences(Int(line)!, 2000) {
        sequenceTotals[sequence] = price + (sequenceTotals[sequence] ?? 0)
    }
}

print(sequenceTotals.values.max() ?? 0)
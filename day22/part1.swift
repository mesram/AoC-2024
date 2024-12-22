func nextSecret(_ secret: Int) -> Int {
    var secret = secret
    secret = (secret ^ (secret * 64))   % 16777216
    secret = (secret ^ (secret / 32))   % 16777216
    secret = (secret ^ (secret * 2048)) % 16777216
    return secret
}

var total = 0
while let line = readLine() {
    var secret = Int(line)!
    for _ in 0..<2000 {
        secret = nextSecret(secret)
    }
    total += secret
}

print(total)
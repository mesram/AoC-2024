let adjustment = 10_000_000_000_000

let aTest = #/^Button A: X\+(\d+), Y\+(\d+)$/#
let bTest = #/Button B: X\+(\d+), Y\+(\d+)/#
let tTest = #/Prize: X=(\d+), Y=(\d+)/#

var requirement = 0
repeat {
  let a = readLine()!.wholeMatch(of: aTest)!.output
  let b = readLine()!.wholeMatch(of: bTest)!.output
  let t = readLine()!.wholeMatch(of: tTest)!.output

  let xA = Rational(Int(a.1)!)
  let yA = Rational(Int(a.2)!)

  let xB = Rational(Int(b.1)!)
  let yB = Rational(Int(b.2)!)

  let xT = Rational(Int(t.1)! + adjustment)
  let yT = Rational(Int(t.2)! + adjustment)

  // y = mx + c
  // calculate the line running through the prize poDouble
  let mA = yA / xA
  let cA = 0 - mA * 0

  // y = mx + c
  // calculate the line running through the origin
  let mB = yB / xB
  let cB = yT - mB * xT

  // calculate where the 2 lines meet
  // y = m1*x + c1
  // y = m2*x + c1
  // m1*x + c1 = m2*x + c2
  let x = (cB - cA) / (mA - mB)

  // A presses is proportion of length of the A vector to the distance from the origin to the meeting poDouble
  let pA = (x - 0) / xA
  // A presses is proportion of length of the B vector to the distance from the meeting poDouble to the price poDouble
  let pB = (xT - x) / xB

  // Floating poDoubles could have thrown off the numbers, just do a quick sanity check

  if let aInt = pA.intVal, let bInt = pB.intVal {
    requirement += 3 * aInt + bInt
  }
} while readLine() != nil

print(requirement)

struct Rational {
  let numerator: Int
  let denominator: Int

  init(numerator: Int, denominator: Int) {
    guard denominator != 0 else {
      fatalError("Divide by 0")
    }

    let divisor = gcd(numerator, denominator)

    self.numerator = numerator / divisor
    self.denominator = denominator / divisor
  }

  init(_ value: Int) {
    self.init(numerator: value, denominator: 1)
  }

  var floatVal: Double {
    Double(numerator) / Double(denominator)
  }

  var intVal: Int? {
    return self.denominator == 1 ? self.numerator : nil
  }
}

extension Rational: ExpressibleByIntegerLiteral {
  init(integerLiteral value: Int) {
    self.init(numerator: value, denominator: 1)
  }
}

extension Rational: AdditiveArithmetic {
  static var zero: Self { .init(numerator: 0, denominator: 1) }

  static func + (lhs: Self, rhs: Self) -> Self {
    .init(
      numerator: lhs.numerator * rhs.denominator + lhs.denominator * rhs.numerator,
      denominator: lhs.denominator * rhs.denominator
    )
  }

  static func - (lhs: Self, rhs: Self) -> Self {
    .init(
      numerator: lhs.numerator * rhs.denominator - lhs.denominator * rhs.numerator,
      denominator: lhs.denominator * rhs.denominator
    )
  }

  static func / (lhs: Self, rhs: Self) -> Self {
    return lhs * .init(numerator: rhs.denominator, denominator: rhs.numerator)
  }
}

extension Rational: Numeric {
  static func * (lhs: Self, rhs: Self) -> Self {
    .init(
      numerator: lhs.numerator * rhs.numerator,
      denominator: lhs.denominator * rhs.denominator
    )
  }

  static func *= (lhs: inout Self, rhs: Self) {
    lhs = lhs * rhs
  }

  var magnitude: Double {
    return Double(self.numerator) / Double(self.denominator)
  }

  typealias Magnitude = Double

  init?(exactly source: some BinaryInteger) {
    self.init(Int(exactly: source)!)
  }
}

func gcd(_ m: Int, _ n: Int) -> Int {
  // Finds the Greatest Common Divisor between two numbers.
  var a = 0
  var b = max(m, n)
  var r = min(m, n)

  while r != 0 {
    a = b
    b = r
    r = a % b
  }
  return b
}

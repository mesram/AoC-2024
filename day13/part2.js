let lines = await Array.fromAsync(console);

const adjustment = 10000000000000;

let requirement = 0;
for (let i = 0; i < lines.length; i += 4) {
    const [, xA, yA] = lines[i].match(new RegExp("Button A: X\\+(\\d+), Y\\+(\\d+)")).map(Number);
    const [, xB, yB] = lines[i + 1].match(new RegExp("Button B\\: X\\+(\\d+), Y\\+(\\d+)")).map(Number);
    const [, xT, yT] = lines[i + 2].match(new RegExp("Prize\\: X=(\\d+), Y=(\\d+)")).map(v => Number(v) + adjustment);

    // y = mx + c
    // calculate the line running through the prize point
    const mA = yA / xA;
    const cA = 0 - mA * 0;

    // y = mx + c
    // calculate the line running through the origin
    const mB = yB / xB;
    const cB = yT - mB * xT;

    // calculate where the 2 lines meet
    // y = m1*x + c1
    // y = m2*x + c1
    // m1*x + c1 = m2*x + c2
    const x = (cB - cA) / (mA - mB);

    // A presses is proportion of length of the A vector to the distance from the origin to the meeting point
    const pA = Math.round((x - 0) / xA);
    // A presses is proportion of length of the B vector to the distance from the meeting point to the price point
    const pB = Math.round((xT - x) / xB);

    // Floating points could have thrown off the numbers, just do a quick sanity check
    const success = (pA * xA + pB * xB) === xT && (pA * yA + pB * yB) === yT;

    if (success) {
        requirement += 3 * pA + pB;
    }
}

console.log(requirement);

let lines = await Array.fromAsync(console);

let requirement = 0;
for (let i = 0; i < lines.length; i += 4) {
    const [, aX, aY] = lines[i].match(new RegExp("Button A: X\\+(\\d+), Y\\+(\\d+)"));
    const [, bX, bY] = lines[i + 1].match(new RegExp("Button B\\: X\\+(\\d+), Y\\+(\\d+)"));
    const [, prizeX, prizeY] = lines[i + 2].match(new RegExp("Prize\\: X=(\\d+), Y=(\\d+)"));

    const a = [Number(aX), Number(aY)];
    const b = [Number(bX), Number(bY)];
    const prize = [Number(prizeX), Number(prizeY)];
    const cost = minScore(a, b, prize);

    requirement += cost ?? 0;

    // console.log({a, b, prize, cost});
}

console.log(requirement);

function minScore(a, b, prize) {
    let minScore = null;

    for (let touches = 1; touches <= 200; touches += 1) {
        let undershoots = false;
        
        for (let aTouches = 0; aTouches <= touches; aTouches += 1) {
            const bTouches = touches - aTouches;

            const x =  a[0] * aTouches + b[0] * bTouches;
            const y =  a[1] * aTouches + b[1] * bTouches;

            if (x === prize[0] && y === prize[1]) {
                minScore = Math.min(minScore ?? Number.MAX_SAFE_INTEGER, 3 * aTouches + bTouches);
                undershoots = true;
            } else if (!undershoots && x < prize[0] && y < prize[1]) {
                undershoots = true;
            }
        }

        if (!undershoots) {
            // console.log(`${touches} overshoots the target a`);
            break;
        }
    }

    return minScore;
}

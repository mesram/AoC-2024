import { createSignal, createMemo, createEffect, Index } from "solid-js";

const [sizeLine, ...lines] = await Array.fromAsync(console);
const [width, height] = sizeLine.split(" ").map(Number);

const robots = [];

for (const line of lines) {
    const [, x, y, vX, vY] = line.match(new RegExp("p=(-?\\d+),(-?\\d+) v=(-?\\d+),(-?\\d+)")).map(Number);
    robots.push({ x, y, vX, vY });
}

export function getRobots(stepCount) {
    const grid = new Array(height).fill(null).map(() => new Array(width).fill(false));

    for (const robot of robots) {
        const { x, y, vX, vY } = robot;
        
        let nextX = (x + stepCount * (width + vX)) % width;
        let nextY = (y + stepCount * (height + vY)) % height;

        grid[nextY][nextX] = true;
    }

    return grid;
}

// render this component to visualise 
function Robots() {
    const [step, setStep] = createSignal(0);
    const robots = createMemo(() => getRobots(step() || 0));

    const [hAlignStart, setHAlignStart] = createSignal(null);
    const [vAlignStart, setVAlignStart] = createSignal(null);

    createEffect(() => {
        const h = hAlignStart(); // should repeat based on height
        const v = vAlignStart(); // should repeat based on width

        if (h !== null && v!== null) {
            console.log('searching');
            let hStep = h;
            let vStep = v;

            for (let i = 0; i < 1000; i += 1) {
                if (hStep === vStep) {
                    console.log(`h: ${h}, v: ${v}, xmas tree: ${hStep}`);
                    return;
                } else if (hStep < vStep) {
                    hStep += height;
                } else {
                    vStep += width;
                }        
            } 

            console.log("couldn't find xmas tree");
        }
    });

    return (
        <div>
            <div>
                <input
                    type="number"
                    min={0}
                    step={1}
                    value={step()}
                    onInput={(e) => setStep(e.target.valueAsNumber)}
                />
                <button onClick={() => setHAlignStart(step())}>Aligned horizontally!</button>
                <button onClick={() => setVAlignStart(step())}>Aligned vertically!</button>
            </div>
            <Index each={robots()}>
                {(line) => (
                    <div style={{ display: "flex" }}>
                        <Index each={line()}>
                            {(exists) => (
                                <div
                                    style={{
                                        width: "5px",
                                        height: "5px",
                                        background: exists() ? "red" : "",
                                    }}
                                />
                            )}
                        </Index>
                    </div>
                )}
            </Index>
        </div>
    );
}
const [sizeLine, ...lines] = await Array.fromAsync(console);
const [width, height] = sizeLine.split(" ").map(Number);

const stepCount = 100;

const midX = Math.floor(width / 2);
const midY = Math.floor(height / 2);

const regions = [0, 0, 0, 0];

for (const line of lines) {
    const [, x, y, vX, vY] = line.match(new RegExp("p=(-?\\d+),(-?\\d+) v=(-?\\d+),(-?\\d+)")).map(Number);

    let nextX = (x + stepCount * (width + vX)) % width;
    let nextY = (y + stepCount * (height + vY)) % height;

    const left = nextX < midX;
    const right = nextX > midX;
    const top = nextY < midY;
    const bottom = nextY > midY;

    switch(true) {
        case top && left: regions[0] += 1; break;
        case top && right: regions[1] += 1; break;
        case bottom && left: regions[2] += 1; break;
        case bottom && right: regions[3] += 1; break;
    }
}

console.log(regions.reduce((t, v) => t * v, 1));
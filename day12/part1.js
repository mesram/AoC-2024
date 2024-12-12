const grid = [];

for await (const line of console) {
    grid.push(line.split(""));
}


const height = grid.length;
const width = grid[0].length;

const directions = [
    [-1, 0], // up
    [+1, 0], // down
    [0, -1], // left
    [0, + 1], // right
];

let queue = [];
for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column +=1) {
        queue.push([row, column])
    }
}

let total = 0;

while (queue.length > 0) {
    let groupQueue = [queue.shift()];

    let value;
    let perimeter = 0;
    const group = new Set();

    while (groupQueue.length > 0) {
        const [row, column] = groupQueue.pop();
        queue = queue.filter(([r, c]) => r !== row || c !== column);
        group.add(`${row}.${column}`);
        value = grid[row][column];

        for (const [dRow, dCol] of directions) {
            const r = row + dRow;
            const c = column + dCol;
            const neighbourKey = `${r}.${c}`;
    
            const neighbour = grid[r]?.[c];            
            if (neighbour !== value) {
                perimeter += 1;
            } else if (!group.has(neighbourKey)) {
                groupQueue.push([r, c]);
                group.add(neighbourKey);
            }
        }
    }

    console.log(`Added group "${value}" with P=${perimeter}, A=${group.size}`);
    total += group.size * perimeter;
}

console.log(total);
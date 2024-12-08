const map = [];


for await (const line of console) {
    map.push(line.split(""));
}

const height = map.length;
const width = map[0].length;

const frequencyLocations = {};
for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
        const frequency = map[row][column];
        if (frequency !== ".") {
            frequencyLocations[frequency] ??= [];
            frequencyLocations[frequency].push([row, column]);
        }
    }
}

const antinodeLocations = new Set();
for (const [frequency, locations] of Object.entries(frequencyLocations)) {
    for (let i = 0; i < locations.length - 1; i += 1) {
        for (let j = i + 1; j < locations.length; j += 1) {
            const [row1, col1] = locations[i];
            const [row2, col2] = locations[j];

            const dRow = row2 - row1;
            const dCol = col2 - col1;

            const antinode1Row = row1 - dRow;
            const antinode1Col = col1 - dCol;
            if (antinode1Row >= 0 && antinode1Row < height && antinode1Col >= 0 && antinode1Col < width) {
                antinodeLocations.add(`${antinode1Row}.${antinode1Col}`);
            }

            const antinode2Row = row2 + dRow;
            const antinode2Col = col2 + dCol;
            if (antinode2Row >= 0 && antinode2Row < height && antinode2Col >= 0 && antinode2Col < width) {
                antinodeLocations.add(`${antinode2Row}.${antinode2Col}`);
            }
        }
    }
}

console.log(antinodeLocations.size);
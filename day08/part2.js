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
            let [row1, col1] = locations[i];
            let [row2, col2] = locations[j];

            antinodeLocations.add(`${row1}.${col1}`);
            antinodeLocations.add(`${row2}.${col2}`);

            const dRow = row2 - row1;
            const dCol = col2 - col1;

            while (true) {
                row1 -= dRow;
                col1 -= dCol;
                if (row1 < 0 || row1 >= height || col1 < 0 || col1 >= width) break;
                antinodeLocations.add(`${row1}.${col1}`);
            }

            while (true) {
                row2 += dRow;
                col2 += dCol;
                if (row2 < 0 || row2 >= height || col2 < 0 || col2 >= width) break;
                antinodeLocations.add(`${row2}.${col2}`);
            }
        }
    }
}

console.log(antinodeLocations.size);
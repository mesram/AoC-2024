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

            const dRow = row2 - row1;
            const dCol = col2 - col1;

            do {
                antinodeLocations.add(`${row1}.${col1}`);
                row1 -= dRow;
                col1 -= dCol;
            } while (row1 >= 0 && row1 < height && col1 >= 0 && col1 < width);

            do {
                antinodeLocations.add(`${row2}.${col2}`);
                row2 += dRow;
                col2 += dCol;
            } while (row2 >= 0 && row2 < height && col2 >= 0 && col2 < width);
        }
    }
}

console.log(antinodeLocations.size);
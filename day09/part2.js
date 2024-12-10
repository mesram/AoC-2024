let input;

for await (const line of console) {
    input = line;
    break;
}

let map = [];

let consumedSpaceMap = [];
let freeSpaceMap = [];
for (let i = 0; i < input.length; i += 2) {
    let id = i / 2;

    let consumedSpace = Number(input[i]);
    let emptySpace = Number(input[i + 1] ?? 0);
    
    consumedSpaceMap.push({
        fromIndex: map.length,
        toIndex: map.length + consumedSpace,
    });

    freeSpaceMap.push({
        fromIndex: map.length + consumedSpace,
        toIndex: map.length + consumedSpace + emptySpace,
    });

    map.push(...(new Array(consumedSpace).fill(id)));
    map.push(...(new Array(emptySpace).fill(null)));
}

while (consumedSpaceMap.length > 0 && freeSpaceMap.length > 0) {
    const { fromIndex, toIndex } = consumedSpaceMap.pop();
    const requirement = toIndex - fromIndex;
    const freeSpace = freeSpaceMap.find((space) => {
        const isBefore = space.fromIndex < fromIndex;
        const fits = space.toIndex - space.fromIndex >= requirement;
        return isBefore && fits;
    });
    if (!freeSpace) continue;
    

    for (let i = 0; i < requirement; i += 1) {
        map[freeSpace.fromIndex + i] = map[fromIndex + i];
        map[fromIndex + i] = null;
    }

    freeSpace.fromIndex += requirement;
}

let checksum = map.reduce((total, id, index) => {
    if (id === null) return total;
    return total + id * index;
}, 0);

console.log(checksum);
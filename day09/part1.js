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
    
    for (let consumedSpaced = input[i]; consumedSpaced > 0; consumedSpaced -= 1 ) {
        consumedSpaceMap.push(map.length)
        map.push(id);
    }

    for (let freeSpace = input[i + 1] ?? 0; freeSpace > 0; freeSpace -= 1 ) {
        freeSpaceMap.push(map.length)
        map.push(null);
        
    }
}

while (consumedSpaceMap.length > 0 && freeSpaceMap.length > 0) {
    let fromIndex = consumedSpaceMap.pop();
    let toIndex = freeSpaceMap.shift();
    if (fromIndex <= toIndex) break;
    map[toIndex] = map[fromIndex];
    map[fromIndex] = null;
}

let checksum = map.reduce((total, id, index) => {
    if (id === null) return total;
    return total + id * index;
}, 0);

console.log(checksum);
export function arrayWindow1d(source, [columns]) {
    const result = [];
    for (let column = 0; column <= source.length - columns; column += 1) {
        const item = [];
        for (let j = 0; j < columns; j += 1) {
            item.push(source[column + j]);
        }
        result.push(item);
    }
    return result;
}

export function arrayWindow2d(source, [rows, columns]) {
    const result = [];
    for (let row = 0; row <= source.length - rows; row += 1) {
        for (let column = 0; column <= source[row].length - columns; column += 1) {
            const item = []
            result.push(item);

            for (let i = 0; i < rows; i += 1) {
                const item2 = []
                item.push(item2);
                for (let j = 0; j < columns; j += 1) {
                    item2.push(source[row + i][column + j]);
                }
            }
        }
    }
    return result;
}
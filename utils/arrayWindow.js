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

export function arrayWindow2d(
    source, 
    [rows, columns], 
    { overflow = false, overlap = true, emptyValue } = {}
) {
    const height = source.length;
    const width = source[0].length;
    const result = [];
    for (let row = 0; row <= height - (overflow ? 1 : rows); row += overlap ? 1 : rows) {
        for (let column = 0; column <= width - (overflow ? 1 : columns); column += overlap ? 1 : columns) {
            const item = []
            result.push(item);

            for (let i = 0; i < rows; i += 1) {
                const item2 = []
                item.push(item2);
                for (let j = 0; j < columns; j += 1) {
                    item2.push(source[row + i]?.[column + j] ?? emptyValue);
                }
            }
        }
    }
    return result;
}
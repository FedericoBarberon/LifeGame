export function inRange(x: number, a: number, b: number) {
    return x >= a && x < b
}

export function matrix<T>(rows: number, cols: number, initialValue: T) {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => initialValue))
}

export function getCoorinates(width: number, height: number, index: number) {
    return {
        col: index % width,
        row: Math.floor(index / height),
    }
}

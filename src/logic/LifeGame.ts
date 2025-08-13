import { inRange } from "../utils/index"

export class LifeGame {
    width: number
    height: number
    board: boolean[][]

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.board = this.generateEmptyBoard()
    }

    toggleCell(i: number, j: number) {
        this.board[i][j] = !this.board[i][j]
    }

    clearBoard() {
        this.board = this.generateEmptyBoard()
    }

    nextGeneration() {
        this.board = this.board.map((_, i) => {
            return this.board[i].map((isAlive, j) => {
                const neighborsAlive = this.countNeighborsAlive(i, j)
                if (isAlive && (neighborsAlive < 2 || neighborsAlive > 3)) return false
                if (!isAlive && neighborsAlive === 3) return true

                return isAlive
            })
        })
    }

    private countNeighborsAlive(i: number, j: number) {
        let count = 0
        const relativeIndex = [-1, 0, 1]
        for (const offsetX of relativeIndex) {
            for (const offsetY of relativeIndex) {
                if (offsetX === 0 && offsetY === 0) continue

                const x = i + offsetX
                const y = j + offsetY
                if (inRange(x, 0, this.width) && inRange(y, 0, this.height) && this.board[x][y]) count++
            }
        }
        return count
    }

    private generateEmptyBoard() {
        return Array.from({ length: this.width }, () => Array.from({ length: this.height }, () => false))
    }
}

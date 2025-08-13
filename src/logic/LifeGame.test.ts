import { test, expect, describe } from "vitest"
import { LifeGame } from "./LifeGame"

test("initialize empty board", () => {
    const width = 2
    const height = 2
    const game = new LifeGame(width, height)

    const expectedBoard = [
        [false, false],
        [false, false],
    ]

    expect(game.width, "wrong width").toBe(width)
    expect(game.height, "wrong height").toBe(height)
    expect(game.board, "wrong board").toEqual(expectedBoard)
})

test("toggle cell", () => {
    const game = new LifeGame(3, 3)
    const i = 1
    const j = 2

    expect(game.board[i][j]).toBe(false)
    game.toggleCell(i, j)
    expect(game.board[i][j]).toBe(true)
})

describe("Getting next generation", () => {
    test("cell die with 0 neighbors", () => {
        const game = new LifeGame(3, 3)
        const i = 1,
            j = 1
        game.toggleCell(i, j)
        game.nextGeneration()

        expect(game.board[i][j]).toBe(false)
    })

    test("cell die with 1 neighbor", () => {
        const game = new LifeGame(3, 3)
        const i = 1,
            j = 1
        game.toggleCell(i, j)
        game.toggleCell(i + 1, j)
        game.nextGeneration()

        expect(game.board[i][j]).toBe(false)
    })
    test("cell die with 3+ neighbors", () => {
        const game = new LifeGame(3, 3)
        const i = 1,
            j = 1
        game.toggleCell(i, j)
        game.toggleCell(i - 1, j - 1)
        game.toggleCell(i - 1, j + 1)
        game.toggleCell(i + 1, j - 1)
        game.toggleCell(i + 1, j + 1)
        game.nextGeneration()

        expect(game.board[i][j]).toBe(false)
    })
    test("cell born with 3 neighbors", () => {
        const game = new LifeGame(3, 3)
        const i = 1,
            j = 1
        game.toggleCell(i - 1, j - 1)
        game.toggleCell(i - 1, j + 1)
        game.toggleCell(i + 1, j - 1)
        game.nextGeneration()

        expect(game.board[i][j]).toBe(true)
    })
    test("cell dont die with 2 or 3 neighbors", () => {
        const game = new LifeGame(3, 3)
        const i = 1,
            j = 1
        game.toggleCell(i, j)
        game.toggleCell(i - 1, j + 1)
        game.toggleCell(i + 1, j - 1)
        game.nextGeneration()

        expect(game.board[i][j]).toBe(true)
    })
    test("full board", () => {
        const game = new LifeGame(3, 3)
        game.toggleCell(0, 0)
        game.toggleCell(0, 2)
        game.toggleCell(1, 1)
        game.toggleCell(2, 0)
        game.toggleCell(2, 2)
        /*
        [ initial Board
            [true,false,true],
            [false,true,false],
            [true,false,true]
        ]
        */
        game.nextGeneration()
        const expectedBoard = [
            [false, true, false],
            [true, false, true],
            [false, true, false],
        ]

        expect(game.board).toEqual(expectedBoard)
    })
})

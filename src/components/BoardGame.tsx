import { useEffect, useRef, useState } from "react"
import { getCoorinates, matrix } from "../utils"
import { LifeGame } from "../logic/LifeGame"

interface BoardProps {
    width: number
    height: number
    gridOn: boolean
    timeMS: number
}

function BoardGame({ width, height, gridOn, timeMS }: BoardProps) {
    const [started, setStarted] = useState(false)
    const [board, setBoard] = useState(matrix(width, height, false))
    const [generation, setGeneration] = useState(0)
    const gameRef = useRef<LifeGame>(null)
    const intervalRef = useRef<number>(null)

    useEffect(() => {
        gameRef.current = new LifeGame(width, height)
        setBoard(gameRef.current.board)
        setGeneration(0)

        return () => {
            gameRef.current = null
        }
    }, [width, height])

    useEffect(() => {
        if (started && gameRef.current) {
            const game = gameRef.current
            intervalRef.current = setInterval(() => {
                if (game.board.every((row) => row.every((isAlive) => !isAlive))) {
                    clearInterval(intervalRef.current!)
                    setStarted(false)
                    return
                }
                game.nextGeneration()
                setBoard([...game.board])
                setGeneration((gen) => gen + 1)
            }, timeMS)
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [started, timeMS])

    const toggleCell = (i: number, j: number) => {
        if (!gameRef.current) return

        gameRef.current.toggleCell(i, j)
        setBoard([...gameRef.current.board])
        setGeneration(0)
    }

    const resetGame = () => {
        if (!gameRef.current) return
        gameRef.current.clearBoard()
        setBoard([...gameRef.current.board])
        setGeneration(0)
        setStarted(false)
    }

    return (
        <div className='flex flex-col gap-4 justify-center items-center w-full px-12'>
            <div className='flex gap-4'>
                <button
                    className='px-4 bg-white rounded text-black py-1 hover:brightness-95 active:scale-95 active:brightness-75'
                    onClick={() => setStarted((prevState) => !prevState)}
                >
                    {started ? "Stop" : "Start"}
                </button>
                <button
                    className='px-4 bg-white rounded text-black py-1 hover:brightness-95 active:scale-95 active:brightness-75'
                    onClick={resetGame}
                >
                    Reset Game
                </button>
            </div>
            <div className='w-full md:w-1/2 '>
                <div className=''>
                    <p>Generation: {generation}</p>
                </div>
                <div className='aspect-square grid' style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}>
                    {board.flat().map((isAlive, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                const { row, col } = getCoorinates(width, height, index)
                                toggleCell(row, col)
                            }}
                            className={`border-[1px] hover:border-red-500 ${
                                gridOn ? "border-neutral-700" : "border-black"
                            } ${isAlive ? "bg-white" : "bg-black"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default BoardGame

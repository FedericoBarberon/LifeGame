import { useState } from "react"
import BoardGame from "./components/BoardGame"

function App() {
    const [gameConfig, setGameConfig] = useState({
        width: 30,
        height: 30,
        gridOn: true,
        timeMS: 100,
    })

    const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = name === "gridOn" ? e.target.checked : e.target.value

        setGameConfig((prevConfig) => ({ ...prevConfig, [name]: value }))
    }

    return (
        <div className='w-full min-h-screen bg-gray-900 text-white flex flex-col items-center gap-6 py-12'>
            <h1 className='text-3xl font-semibold'>Game of Life</h1>
            <fieldset className='flex gap-6 border-1 px-4 pb-4 justify-center items-center'>
                <legend className='px-2'>Board</legend>
                <label className='flex flex-col items-center text-center'>
                    Width
                    <input
                        type='number'
                        name='width'
                        value={gameConfig.width}
                        className='bg-white rounded w-1/2 text-black px-2'
                        onChange={handleConfigChange}
                    />
                </label>
                <label className='flex flex-col items-center text-center'>
                    Height
                    <input
                        type='number'
                        name='height'
                        value={gameConfig.height}
                        className='bg-white rounded w-1/2 text-black px-2'
                        onChange={handleConfigChange}
                    />
                </label>
                <label className='flex flex-col items-center text-center'>
                    Time (ms)
                    <input
                        type='number'
                        name='timeMS'
                        value={gameConfig.timeMS}
                        className='bg-white rounded w-1/2 text-black px-2'
                        onChange={handleConfigChange}
                    />
                </label>
                <label className='flex flex-col items-center text-center'>
                    Grid on
                    <input type='checkbox' checked={gameConfig.gridOn} name='gridOn' onChange={handleConfigChange} />
                </label>
            </fieldset>
            <BoardGame
                width={gameConfig.width}
                height={gameConfig.height}
                gridOn={gameConfig.gridOn}
                timeMS={gameConfig.timeMS}
            />
        </div>
    )
}
export default App

import { useEffect, useState, useRef } from 'react'
import { createGame } from '@/utils/balloonGame'

type GridProps = {
  rows: number
  cols: number
}

const Grid = ({ rows, cols }: GridProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const { gameGrid, balloonLocations, connectedSequences } = createGame(10, 10)

  console.log(gameGrid)
  console.log(balloonLocations)
  console.log(connectedSequences)

  useEffect(() => {
    const gridContainer = gridRef.current

    // Define the size of the DOM grid
    const numRows = rows
    const numCols = cols

    // Create the DOM grid
    const grid = document.createElement('div')
    grid.className = 'grid-medium'

    // Create cells and append to the DOM grid
    for (let i = 0; i < gameGrid[0].length; i++) {
      for (let j = 0; j < gameGrid.length; j++) {
        const cell = document.createElement('div')
        cell.className = 'cell'
        grid.appendChild(cell)
      }
    }

    // Append the grid to the container
    gridContainer?.appendChild(grid)

    return () => {
      // gridContainer?.removeChild(grid)
    }
  }, [])

  return (
    <>
      <div
        ref={gridRef}
        id='grid'
      ></div>
    </>
  )
}

export default Grid

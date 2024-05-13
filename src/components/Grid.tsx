import React from 'react'
import { useEffect, useState, useRef, useId } from 'react'
import styled from 'styled-components'

import { createGame } from '@/utils/balloonGame'

interface Props {
  rows: number
  cols: number
}

const Grid = React.memo(({ rows, cols }: Props) => {
  const id = useId()
  const gridRef = useRef<HTMLDivElement>(null)
  let { gameGrid, connectedSequences } = createGame(rows, cols)
  console.log(id)

  // Apply game information
  const StyledGrid = styled.div`
    .grid {
      width: ${cols * 50}px;
      height: ${rows * 50}px;
      grid-template-columns: repeat(${cols}, 50px);
      .cell {
        width: 50px;
        height: 50px;
      }
    }
  `

  const [isGaveOver, setIsGaveOver] = useState(false)
  const [hasWon, setHasWon] = useState(false)

  const handleClick = (balloon: { x: number; y: number }) => {
    checkWin(balloon)
  }

  const checkWin = (balloon: { x: number; y: number }) => {
    for (let i = 0; i < connectedSequences.length; i++) {
      const currentArray = connectedSequences[i]

      for (let j = 0; j < currentArray.length; j++) {
        if (
          currentArray.length === connectedSequences[0].length &&
          currentArray[j].x === balloon.x &&
          currentArray[j].y === balloon.y
        ) {
          currentArray.forEach((element) => {
            document
              .getElementById(`${element.x},${element.y}`)
              ?.classList.remove('balloon')
          })

          let newSequencesToPlay = [...connectedSequences]
          newSequencesToPlay.splice(i, 1)
          connectedSequences = newSequencesToPlay

          if (connectedSequences.length === 0) {
            setHasWon(true)
          }

          return
        }
      }
    }

    setIsGaveOver(true)
    return
  }

  useEffect(() => {
    const gridContainer = gridRef.current

    // Define the size of the DOM grid
    const numRows = gameGrid.length
    const numCols = gameGrid[0].length

    // Create the DOM grid
    const grid = document.createElement('div')
    grid.className = 'grid'

    // Create cells and append to the DOM grid
    for (let x = 0; x < numRows; x++) {
      for (let y = 0; y < numCols; y++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')

        if (gameGrid[x][y] === 1) {
          cell.id = `${x},${y}`
          cell.classList.add('balloon')
          cell.onclick = () => handleClick({ x: x, y: y })
        }

        grid.appendChild(cell)
      }
    }

    // Append the grid to the container
    gridContainer?.appendChild(grid)

    return () => {
      gridContainer?.removeChild(grid)
    }
  }, [rows, cols])

  return (
    <>
      <StyledGrid
        ref={gridRef}
        id='grid'
      ></StyledGrid>

      <div className='game-notification'>
        {hasWon && <h1>Winner Winner Chicken Dinner</h1>}
        {isGaveOver && <h1>GAMEOVER</h1>}
      </div>
    </>
  )
})

export default Grid

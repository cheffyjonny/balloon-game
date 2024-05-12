import { useEffect, useState, useRef, useMemo, useId } from 'react'
import styled from 'styled-components'

import { createGame } from '@/utils/balloonGame'

interface Props {
  rows: number
  cols: number
}

const Grid = ({ rows, cols }: Props) => {
  const id = useId()
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

  const { gameGrid, connectedSequences } = useMemo(() => {
    return createGame(rows, cols)
  }, [])

  // As the cell is already created, handleClick() creates closure environment in the function.
  // Therefore its using a ref to communicate with handleClick() in the cell().
  const sequencesToPlay = useRef(connectedSequences)
  const [isGaveOver, setIsGaveOver] = useState(false)
  const [hasWon, setHasWon] = useState(false)

  console.log('init : ', sequencesToPlay.current)
  const gridRef = useRef<HTMLDivElement>(null)

  const checkWin = (balloon: { x: number; y: number }) => {
    for (let i = 0; i < sequencesToPlay.current.length; i++) {
      const currentArray = sequencesToPlay.current[i]

      for (let j = 0; j < currentArray.length; j++) {
        if (
          currentArray.length === sequencesToPlay.current[0].length &&
          currentArray[j].x === balloon.x &&
          currentArray[j].y === balloon.y
        ) {
          console.log('currentArray : ', currentArray)
          currentArray.forEach((element) => {
            document
              .getElementById(`${element.x},${element.y}`)
              ?.classList.remove('balloon')
          })

          let newSequencesToPlay = [...sequencesToPlay.current]
          newSequencesToPlay.splice(i, 1)
          sequencesToPlay.current = newSequencesToPlay

          if (sequencesToPlay.current.length === 0) {
            setHasWon(true)
          }

          console.log('next round will be : ', sequencesToPlay.current)
          return
        }
      }
    }

    setIsGaveOver(true)
    return
  }

  const handleClick = (balloon: { x: number; y: number }) => {
    checkWin(balloon)
  }

  useEffect(() => {
    const gridContainer = gridRef.current

    // Define the size of the DOM grid
    const numRows = gameGrid.length
    const numCols = gameGrid[0].length
    console.log('numRows : ', numRows)
    console.log('numCols : ', numCols)

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
  }, [])

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
}

export default Grid

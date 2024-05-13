import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import styled from 'styled-components'

// Todo : API 적용
import { addGame, deleteGame } from '@/server/firebase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createGame } from '@/utils/balloonGame'

interface Props {
  rows: number
  cols: number
  onFinishGame: (val: boolean) => void
}
export type GridRef = {
  saveGame: () => void
}

const id = 'absolute-id'

const Grid = React.memo(
  forwardRef<GridRef, Props>(({ rows, cols, onFinishGame }: Props, ref) => {
    let { gameGrid, connectedSequences } = createGame(rows, cols)
    const gridRef = useRef<HTMLDivElement>(null)
    const [hasWon, setHasWon] = useState(false)
    const [isGaveOver, setIsGaveOver] = useState(false)

    // Apply game information for styling
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

    // Todo : 게임 불러오기 중 오류 발생. 수정 필요
    useImperativeHandle(ref, () => ({
      saveGame: () => {
        handleSaveGame()
      },
    }))

    // Todo : 게임 저장, 이전 기록 있을 시 삭제 후 새로운 게임 저장
    const handleSaveGame = async () => {
      const data = {
        id: id,
        gameGrid: JSON.stringify(gameGrid),
        connectedSequences: JSON.stringify(connectedSequences),
      }
      try {
        console.log('Saved : ', data)
        // addGame(data)
      } catch (e) {
        console.log(e)
      }
    }

    const handleClick = (balloon: { x: number; y: number }) => {
      checkWin(balloon)
    }

    const checkWin = (balloon: { x: number; y: number }) => {
      for (let i = 0; i < connectedSequences.length; i++) {
        const currentArray = connectedSequences[i]

        // Remove balloons from the game.
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

            // Update connectedSequences
            connectedSequences = connectedSequences.filter(
              (_, index) => index !== i
            )

            // WINNER
            if (connectedSequences.length === 0) {
              setHasWon(true)
              onFinishGame(true)
            }

            return
          }
        }
      }

      // GAME OVER
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
          {isGaveOver && <h1>GAME OVER</h1>}
        </div>
      </>
    )
  })
)

export default Grid

import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'

// Todo : API 적용
import { addGame, deleteGame, getGame } from '@/server/firebase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createGame, Balloons, TwoDimensionGrid } from '@/utils/balloonGame'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

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
    const gridRef = useRef<HTMLDivElement>(null)

    const { gameGrid, connectedSequences } = createGame(rows, cols)

    const [game, setGame] = useState<TwoDimensionGrid>(gameGrid)
    const [gameSequences, setGameSequences] =
      useState<Balloons[]>(connectedSequences)
    const [hasWon, setHasWon] = useState(false)
    const [isGaveOver, setIsGaveOver] = useState(false)

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
        addGame(data)
      } catch (e) {
        console.log(e)
      }
    }

    const handleClick = (balloon: { x: number; y: number }) => {
      if (!isGaveOver) {
        // Stays in the game, so then the player can analyze the game
        checkWin2(balloon)
      }
    }

    const checkWin2 = (balloon: { x: number; y: number }) => {
      let updatedGame = [...game]
      let updatedGameSequences = [...gameSequences]

      for (let i = 0; i < gameSequences.length; i++) {
        const currentArray = gameSequences[i]

        // Remove balloons from the game.
        for (let j = 0; j < currentArray.length; j++) {
          if (
            currentArray.length === gameSequences[0].length &&
            currentArray[j].x === balloon.x &&
            currentArray[j].y === balloon.y
          ) {
            currentArray.forEach((cell) => {
              updatedGame[cell.x][cell.y] = 0
            })

            updatedGameSequences = updatedGameSequences.filter(
              (_, index) => index !== i
            )

            // Update
            setGame(updatedGame)
            setGameSequences(updatedGameSequences)

            // WINNER
            if (updatedGameSequences.length === 0) {
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

    const [open, setOpen] = React.useState(false)
    const {
      isLoading,
      isError,
      data: prevGame,
      error,
    } = useQuery({
      queryKey: ['game'],
      queryFn: () =>
        getGame().then((res) => {
          if (res) setOpen(true)
          return res
        }),
    })

    if (isLoading) return <span>Loading...</span>

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle>게임 이어하기</DialogTitle>
          <DialogContent>
            <DialogContentText>
              이전에 진행 중이던 게임이 있습니다. 계속 진행하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>새로하기</Button>
            <Button onClick={handleClose}>이어하기</Button>
          </DialogActions>
        </Dialog>

        {!hasWon && (
          <div
            className='grid'
            // Apply game information for styling
            style={{
              width: `${cols * 50}px`,
              height: ` ${rows * 50}px`,
              gridTemplateColumns: `repeat(${cols}, 50px)`,
            }}
            ref={gridRef}
          >
            {game.map((rows, rowIndex) =>
              rows.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}, ${colIndex}`}
                  className={cell === 1 ? 'cell balloon' : 'cell '}
                  onClick={() => {
                    if (cell === 1) handleClick({ x: rowIndex, y: colIndex })
                  }}
                ></div>
              ))
            )}
          </div>
        )}

        <div className='game-notification'>
          {hasWon && <h1>Winner Winner Chicken Dinner</h1>}
          {isGaveOver && <h1>GAME OVER</h1>}
        </div>
      </>
    )
  })
)

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  )
})

export default Grid

import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  ReactElement,
} from 'react'

import { addGame, deleteGame, getGame } from '@/server/firebase'
import { useMutation, useQuery } from '@tanstack/react-query'

import { createGame, Balloons, TwoDimensionGrid } from '@/utils/balloonGame'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

export interface GridRef {
  saveGame: () => void
}

interface Props {
  rows: number
  cols: number
  onFinishGame: (val: boolean) => void
}

const id = 'absolute-id'

const Transition = forwardRef<
  unknown,
  TransitionProps & { children: ReactElement }
>(
  (
    props: TransitionProps & {
      children: ReactElement
    },
    ref
  ) => {
    return (
      <Slide
        direction='up'
        ref={ref}
        {...props}
      />
    )
  }
)

const Grid = React.memo(
  forwardRef<GridRef, Props>(({ rows, cols, onFinishGame }: Props, ref) => {
    const gridRef = useRef<HTMLDivElement>(null)

    const { gameGrid, connectedSequences } = useMemo(
      () => createGame(rows, cols),
      [rows, cols]
    )

    const [game, setGame] = useState<TwoDimensionGrid>(gameGrid)
    const [gameSequences, setGameSequences] =
      useState<Balloons[]>(connectedSequences)
    const [hasWon, setHasWon] = useState(false)
    const [isGaveOver, setIsGaveOver] = useState(false)
    const [open, setOpen] = React.useState(false)

    useImperativeHandle(ref, () => ({
      saveGame: () => {
        handleSaveGame()
      },
    }))

    const handleClickBalloon = (balloon: { x: number; y: number }) => {
      if (!isGaveOver) {
        // Stays in the game, so then the player can analyze the game
        checkWin(balloon)
      }
    }

    const checkWin = (balloon: { x: number; y: number }) => {
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

    // APIs
    const {
      isLoading,
      isError,
      data: prevGame,
    } = useQuery({
      queryKey: ['game'],
      queryFn: () =>
        getGame().then((res) => {
          if (res.length > 0) setOpen(true)
          return res
        }),
    })
    const mutationDeleteGame = useMutation({
      mutationFn: deleteGame,
      onSuccess: () => {
        setOpen(false)
      },
      onError: (error) => {
        toast.error(`서버 오류 ${error}🙁`)
      },
    })
    const mutationSaveGame = useMutation({
      mutationFn: addGame,
      onSuccess: () => {
        toast.success('게임 저장 완료 하였습니다 😊')
      },
      onError: (error) => {
        toast.error(`서버 오류 ${error}🙁`)
      },
    })

    if (isLoading) {
      return <span className='api-notification'>Loading...</span>
    }
    if (isError) {
      return <span className='api-notification'>Some went wrong...</span>
    }

    const handleRenew = () => {
      // Delete the prev game
      if (prevGame && prevGame?.length > 0) {
        mutationDeleteGame.mutate(prevGame[0].id)
      }
      toast.success('새로운 게임을 시작하였습니다 😊')
    }

    const handleContinue = () => {
      if (prevGame && prevGame?.length > 0) {
        setGame(prevGame[0]?.gameGrid)
        setGameSequences(prevGame[0]?.connectedSequences)
      }
      toast.success('게임 불러오기를 하였습니다 😊')
      setOpen(false)
    }

    // Save the game
    const handleSaveGame = async () => {
      const dto = {
        id: id,
        gameGrid: JSON.stringify(game),
        connectedSequences: JSON.stringify(gameSequences),
      }

      try {
        // Delete the old game
        if (prevGame && prevGame?.length > 0) {
          mutationDeleteGame.mutate(prevGame[0].id)
        }
        // Save the new game
        mutationSaveGame.mutate(dto)
      } catch (e) {
        console.log(e)
      } finally {
      }
    }

    return (
      <>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen(false)}
        >
          <DialogTitle>게임 이어하기</DialogTitle>
          <DialogContent>
            <DialogContentText>
              이전에 진행 중이던 게임이 있습니다. 계속 진행하시겠습니까? <br />
              새로운 게임을 시작하면 이전 게임 기록이 삭제됩니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRenew}>새로하기</Button>
            <Button onClick={handleContinue}>이어하기</Button>
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
                    if (cell === 1)
                      handleClickBalloon({ x: rowIndex, y: colIndex })
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

        <ToastContainer
          position='bottom-right'
          autoClose={1700}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </>
    )
  })
)
export default Grid

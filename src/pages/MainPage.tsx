import { useCallback, useEffect, useRef, useState } from 'react'

import GameOption from '@/components/gameOption/GameOption'
import Grid, { GridRef } from '@/components/Grid'
import type { IOption } from '@/components/gameOption/Option'

import { getGame } from '@/server/firebase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const MainPage = () => {
  const ref = useRef<GridRef>(null)
  const [level, setLevel] = useState<IOption>()
  const [isInGame, setIsInGame] = useState<boolean>(false)
  const [isCustom, setIsCustom] = useState<boolean>(false)
  const [hasFinished, setHasFinished] = useState<boolean>(false)

  const handleOnChange = (option: IOption) => {
    // Back to main
    if (option.value === 'back') {
      setLevel(undefined)
      setIsInGame(false)
      setIsCustom(false)
    }
    // Save the game
    else if (option.value === 'save') {
      ref.current?.saveGame()
      //   setLevel(undefined)
      //   setIsInGame(false)
    }
    // Enter the game
    else if (option.value === 'select') {
      setLevel(option)
      setIsInGame(true)
    }
    // Go to customization
    else if (option.value === 'custom') {
      setIsCustom(true)
    }
  }
  const startGame = (option: IOption) => {
    setLevel(option)
    setIsInGame(true)
    setIsCustom(false)
  }
  const onFinishGame = useCallback((val: boolean) => {
    setHasFinished(val)
  }, [])

  return (
    <>
      <div>
        {level?.rows &&
          level.rows > 0 &&
          level.cols &&
          level.cols !== 0 &&
          isInGame && (
            <>
              <Grid
                ref={ref}
                key={level.title}
                rows={level.rows}
                cols={level.cols}
                onFinishGame={onFinishGame}
              />
            </>
          )}

        {!hasFinished && (
          <GameOption
            isInGame={isInGame}
            isCustom={isCustom}
            onChange={handleOnChange}
            onStart={startGame}
          />
        )}
      </div>
    </>
  )
}

export default MainPage

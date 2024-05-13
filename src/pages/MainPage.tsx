import { useCallback, useRef, useState } from 'react'

import GameOption from '@/components/gameOption/GameOption'
import Grid, { GridRef } from '@/components/Grid'
import type { IOption } from '@/components/gameOption/Option'

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
      setLevel(undefined)
      setIsInGame(false)
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
            // Todo: import { getGame} from '@/server/firebase'
            // 게임 레벨 설정시, 이전 게임 불러오기
            // Grid 내에서 useImperativeHandle 적용으로 인하여, 게임 불러오기 중 오류 발생. 수정 필요.
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

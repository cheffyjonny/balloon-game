import { useState } from 'react'

import GameOption from '@/components/gameOption/GameOption'
import Grid from '@/components/Grid'
import type { IOption } from '@/components/gameOption/Option'

const MainPage = () => {
  const [level, setLevel] = useState<IOption>()
  const [isInGame, setIsInGame] = useState<boolean>(false)
  const [isCustom, setIsCustom] = useState<boolean>(false)

  const handleOnChange = (option: IOption) => {
    // Back to main
    if (option.value === -1) {
    }
    // Save the game
    else if (option.value === 1) {
    }
    // Enter the game
    else if (option.value !== 0) {
      setLevel(option)
      setIsInGame(true)
    }
    // Go to customization
    else {
      setIsCustom(true)
    }
  }

  return (
    <>
      <div>
        {level && level.value !== 0 && isInGame && (
          <>
            <Grid
              key={level.title}
              rows={level.value}
              cols={level.value}
            />
          </>
        )}

        <GameOption
          isInGame={isInGame}
          isCustom={isCustom}
          onChange={handleOnChange}
        />
      </div>
    </>
  )
}

export default MainPage

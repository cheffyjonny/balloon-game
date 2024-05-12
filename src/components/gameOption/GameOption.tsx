import Option, { IOption } from './Option'

interface Props {
  onChange: (level: IOption) => void
  isInGame: boolean
  isCustom: boolean
}

// Define static data
const levelOptions = [
  { title: '초보자', value: 5 },
  { title: '중급자', value: 10 },
  { title: '상급자', value: 15 },
  { title: 'CHALLENGE', value: 0 },
]
const roomOptions = [
  { title: '뒤로가기', value: -1 },
  { title: '저장하기', value: 1 },
]
const customOptions = [
  { title: '뒤로가기', value: -1 },
  { title: '시작하기', value: 1 },
]

const SelectLevel = ({ onChange, isInGame, isCustom }: Props) => {
  const handleClick = (level: IOption) => {
    onChange(level)
  }

  return (
    <>
      {isCustom ? (
        <Option
          list={customOptions}
          className='room-option-button-container'
          handleClick={handleClick}
        />
      ) : isInGame ? (
        <Option
          list={roomOptions}
          className='room-option-button-container'
          handleClick={handleClick}
        />
      ) : (
        <Option
          list={levelOptions}
          className='level-button-container'
          handleClick={handleClick}
        />
      )}
    </>
  )
}

export default SelectLevel

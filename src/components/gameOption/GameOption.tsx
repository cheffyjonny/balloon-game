import { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField'

import Option, { IOption } from './Option'

interface Props {
  onChange: (option: IOption) => void
  onStart: (option: IOption) => void
  isInGame: boolean
  isCustom: boolean
}

// Define static data
const levelOptions = [
  { title: '초보자', value: 'select', rows: 5, cols: 5 },
  { title: '중급자', value: 'select', rows: 10, cols: 10 },
  { title: '상급자', value: 'select', rows: 15, cols: 15 },
  { title: 'CHALLENGE', value: 'custom' },
]
const roomOptions = [
  { title: '뒤로가기', value: 'back' },
  { title: '저장하기', value: 'save' },
]
const customOptions = [
  { title: '뒤로가기', value: 'back' },
  { title: '시작하기', value: 'start' },
]
const gameoverOptions = [
  { title: '뒤로가기', value: 'back' },
  { title: '시작하기', value: 'start' },
]

const SelectLevel = ({ onChange, onStart, isInGame, isCustom }: Props) => {
  const [rows, setRows] = useState(0)
  const [cols, setCols] = useState(0)

  const handleClick = (option: IOption) => {
    // Start custom game
    if (option.value === 'start') {
      onStart({ title: 'custom', value: 'custom', rows: rows, cols: cols })
    }
    // Select option, start the game
    else {
      onChange(option)
    }
  }
  const handleRowsChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const val: number = parseInt(event.target.value)
    setRows(val)
  }
  const handleColsChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const val: number = parseInt(event.target.value)
    setCols(val)
  }
  return (
    <>
      {!isInGame && !isCustom && (
        <Option
          list={levelOptions}
          className='level-button-container'
          handleClick={handleClick}
        />
      )}
      {isInGame && !isCustom && (
        <Option
          list={roomOptions}
          className='room-option-button-container'
          handleClick={handleClick}
        />
      )}
      {isCustom && (
        <>
          <div className='custom-option-container'>
            <TextField
              autoFocus
              type='number'
              label='가로'
              variant='outlined'
              onChange={handleRowsChange}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
            />
            <TextField
              type='number'
              label='세로'
              variant='outlined'
              onChange={handleColsChange}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
            />
          </div>

          <Option
            list={customOptions}
            className='room-option-button-container'
            handleClick={handleClick}
          />
        </>
      )}
    </>
  )
}

export default SelectLevel

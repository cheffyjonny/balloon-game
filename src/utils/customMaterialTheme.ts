import { createTheme } from '@mui/material/styles'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'

export const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '--TextField-brandBorderColor': 'var(--text-input-border-color)',
          '--TextField-brandBorderHoverColor': '#B2BAC2',
          '--TextField-brandBorderFocusedColor':
            'var(--text-input-border-color)',
          '& label.Mui-focused': {
            color: 'var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--TextField-brandBorderColor)',
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderHoverColor)',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'white',
          '&::before': {
            borderBottom: '2px solid var(--TextField-brandBorderColor)',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
          },
          '&.Mui-focused:after': {
            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'var(--input-placeholder-color)',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'var(--input-color)',
        },
      },
    },
  },
})

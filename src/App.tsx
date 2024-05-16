import { useEffect } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

import './css/main.scss'
import MainPage from 'pages/MainPage'
import { useThemeProvider } from './context/UserThemeProvider'

function App() {
  const { theme, toggleTheme } = useThemeProvider()

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'dark' ? 'dark' : 'light'
    )
  }, [theme])

  return (
    <>
      <DarkModeSwitch
        className='theme-provider'
        checked={theme === 'dark'}
        onChange={toggleTheme}
        sunColor='var(--neutral-900)'
        size={50}
      />
      <MainPage />
    </>
  )
}

export default App

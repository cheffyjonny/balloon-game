import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from './ThemeProvider'
import App from './App.tsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)

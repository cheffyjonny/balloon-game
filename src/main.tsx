import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider, THEME_ID } from '@mui/material/styles'

import { UserThemeProvider } from './context/UserThemeProvider.tsx'
import { customTheme } from '@/utils/customMaterialTheme.ts'

import App from './App.tsx'
import './index.scss'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserThemeProvider>
      <ThemeProvider theme={{ [THEME_ID]: customTheme }}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </UserThemeProvider>
  </React.StrictMode>
)

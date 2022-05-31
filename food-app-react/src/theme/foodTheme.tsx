import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React, { ReactElement, ReactNode } from 'react'
import theme from './theme'
interface MuiThemeProps {
    children: ReactNode;
}
const FoodTheme = ({ children }: MuiThemeProps) => {
    // console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default FoodTheme

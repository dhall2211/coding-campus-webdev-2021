import { createTheme, Theme } from "@mui/material/styles";
import {
  error,
  grey,
  primary,
  secondary,
  success,
  warning,
} from "./themeColors";

const fontSize = 14;

const fontFamily = [
  "Open Sans",
  "Roboto",
  "Ubuntu",
  "Helvetica Neue",
  "sans-serif",
].join(",");

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});


const foodAppTheme = createTheme({
  palette: {
    primary: {
      ...primary,
      light: primary[100],
    },
    secondary,
    error,
    warning,
    success,
    text: {
      primary: grey[900],
      secondary: grey[800],
      disabled: grey[400],
    },
    divider: grey[200],
    grey: { ...grey },
    background: {
      default: grey[100],
    },
  },
  typography: {
    fontSize,
    fontFamily,
    htmlFontSize: 16,
    body1: { fontSize },
    body2: { fontSize },
  },
});

const theme = { ...customTheme, ...foodAppTheme };

theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";

export type MuiThemeProps = Theme;

export default theme;

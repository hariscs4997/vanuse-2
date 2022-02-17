import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#31B7B7',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: "#ED2E7E",
    },
  },
});

export default theme;

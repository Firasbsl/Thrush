import { ThemeProvider,createTheme } from '@mui/material/styles';

const theme = createTheme({

    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type : 'light',
      primary: {
        main: '#db550d',
      },
      secondary: {
        main: '#208080',
      },
    },
  })

export default theme
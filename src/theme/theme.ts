import { createTheme } from '@mui/material/styles'

const headingFont = '"Poppins", sans-serif'
const bodyFont = '"Inter", sans-serif'

const softShadow = '0px 4px 20px rgba(0, 0, 0, 0.04)'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#EA4335',
      light: '#F06E63',
      dark: '#C53023',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1A1A1A',
      light: '#4D4D4D',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: bodyFont,
    h1: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h2: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h3: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h4: {
      fontFamily: headingFont,
      fontWeight: 600,
    },
    h5: {
      fontFamily: headingFont,
      fontWeight: 600,
    },
    h6: {
      fontFamily: headingFont,
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontWeight: 400,
    },
    overline: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: softShadow,
          border: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: softShadow,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.24)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})
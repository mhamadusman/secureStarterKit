import { createTheme } from '@mui/material/styles'

const headingFont = '"Poppins", sans-serif'
const bodyFont = '"Inter", sans-serif'

const softShadow = '0px 4px 20px rgba(0, 0, 0, 0.04)'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0B6655',
      light: '#0E826D',
      dark: '#084F42',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#05B19A',
      light: '#2EC4B0',
      dark: '#048F7D',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F8F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A2E2A',
      secondary: '#5A6F6A',
    },
    divider: 'rgba(11, 102, 85, 0.08)',
  },
  shape: {
    borderRadius: 12,
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
          backgroundColor: '#F5F8F7',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
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
          borderRadius: 12,
          boxShadow: softShadow,
          border: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
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
          borderRadius: 12,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(11, 102, 85, 0.12)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(11, 102, 85, 0.24)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

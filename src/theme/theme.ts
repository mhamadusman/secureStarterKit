import { createTheme } from '@mui/material/styles'

// Fonts preserved as requested
const headingFont = '"Poppins", sans-serif'
const bodyFont = '"Inter", sans-serif'

// Accent color extracted from screenshot reference
const tealAccent = '#00A896'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: tealAccent,
      light: '#33BBB0',
      dark: '#007669',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#E0E0E0',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  shape: {
    borderRadius: 0, // Enforces rectangular design globally
  },
  typography: {
    fontFamily: bodyFont,
    h1: { fontFamily: headingFont, fontWeight: 700 },
    h2: { fontFamily: headingFont, fontWeight: 700 },
    h3: { fontFamily: headingFont, fontWeight: 700 },
    h4: { fontFamily: headingFont, fontWeight: 600 },
    h5: { fontFamily: headingFont, fontWeight: 600 },
    h6: { fontFamily: headingFont, fontWeight: 600 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400, fontSize: '0.75rem' },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.875rem',
    },
    caption: { fontWeight: 400 },
    overline: { fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121212',
          color: '#FFFFFF',
        },
      },
    },
    // Button styling: White background, black text, hover highlight (white background, no border)
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          border: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#E6E6E6', // Highlight background color on hover
            border: 'none',
            outline: 'none',
          },
        },
        // Teal filled buttons (if primary variant is specified, e.g., SIGN IN accent button)
        containedPrimary: {
          backgroundColor: tealAccent,
          color: '#FFFFFF',
          borderRadius: 20, // Rounded pill shape as seen in the screenshot accent button
          '&:hover': {
            backgroundColor: '#008E7E',
            boxShadow: 'none',
          },
        },
      },
    },
    // Input Fields: Black background, rectangular, very small text size
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          fontSize: '0.75rem', // Significantly smaller text size
          borderRadius: 0,
        },
        input: {
          padding: '10px 12px',
          fontSize: '0.75rem',
          color: '#FFFFFF',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          fontSize: '0.75rem',
          '&.Mui-focused': {
            color: tealAccent,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: '#000000',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 0,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: tealAccent,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundImage: 'none',
          backgroundColor: '#1A1A1A',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
})
import { createTheme } from '@mui/material/styles';

const colorsTheme = createTheme({
  palette: {
    grey: {
      500: '#A6ABB0',
      700: '#F4F4F4',
      900: '#FFFFFF',
    },
  },
});

export const theme = createTheme(colorsTheme, {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            borderColor: colorsTheme.palette.grey['500'],
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: colorsTheme.palette.grey['700'],
          borderRadius: '8px',
          maxHeight: '48px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected': {
            backgroundColor: colorsTheme.palette.grey['900'],
            color: colorsTheme.palette.text.primary,
            borderRadius: '8px',
            maxHeight: '40px',
            minHeight: '40px',
            margin: '4px',
          },
        },
      },
    },
  },
});

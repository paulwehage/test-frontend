import { createTheme } from '@mui/material/styles';

declare module '@mui/material' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 16,
    body1: {
      fontSize: 16,
    },
  },
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0068a5',
      darker: '#053e85',
    },
    neutral: {
      main: '#000',
      contrastText: '#fff',
    },
  },
});

export default theme;

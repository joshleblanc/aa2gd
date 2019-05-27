import {createMuiTheme} from '@material-ui/core';
import primary from "@material-ui/core/colors/blue";
import secondary from "@material-ui/core/colors/yellow";

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: primary,
    secondary: secondary,
    background: {
      default: 'rgb(255,255,255)'
    }
  },
  typography: {
    fontFamily: [
      '"Press Start 2P"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 10

  }
});

export default theme;

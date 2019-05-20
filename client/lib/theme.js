import {createMuiTheme} from '@material-ui/core';
import primary from "@material-ui/core/colors/blue";
import secondary from "@material-ui/core/colors/yellow";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: primary,
    secondary: secondary
  }
});

export default theme;
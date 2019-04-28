import MobileDrawer from './MobileDrawer';
import DesktopDrawer from './DesktopDrawer';
import { makeStyles } from '@material-ui/styles';
import { Hidden } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

export default () => {
  const classes = useStyles();
  return(
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <MobileDrawer/>
      </Hidden>
      <Hidden xsDown implmentation="css">
        <DesktopDrawer/>
      </Hidden>
    </nav>
  )
}
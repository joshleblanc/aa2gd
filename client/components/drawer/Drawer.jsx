import { Drawer, Hidden } from "@material-ui/core";
import MobileDrawer from './MobileDrawer';
import { makeStyles } from '@material-ui/styles';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

export default () => {
  const classes = useStyles();
  return(
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <MobileDrawer />
      </Hidden>
    </nav>
  )
}
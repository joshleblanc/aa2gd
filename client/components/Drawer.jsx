import { Drawer } from "@material-ui/core";

const useStyles = makeStyles({
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
})

export default () => {
  const classes = useStyles();
  return(
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          classes={{
            paper: classes.drawerPaper
          }}
          modalProps={{
            keepMounted: true
          }}
        >
          
        </Drawer>
      </Hidden>
    </nav>
  )
}
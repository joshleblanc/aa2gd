import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: drawerWidth,
      },
}));

export default ({children, ...props}) => {
    const classes = useStyles();
    return(
        <Drawer
            classes={{
                paper: classes.drawerPaper
            }}
            {...props}
        >
            {children}
        </Drawer>
    )
}
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DrawerItems from './DrawerItems';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import useDrawer from '../../hooks/useDrawer';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: drawerWidth,
      },
}));

export default () => {
    const classes = useStyles();
    const { drawerOpen, toggleDrawer } = useDrawer();
    return(
        <Drawer
            variant="temporary"
            classes={{
                paper: classes.drawerPaper
            }}
            modalProps={{
                keepMounted: true
            }}
            open={drawerOpen}
            onClose={toggleDrawer}
        >
            <DrawerItems />
        </Drawer>
    )
}
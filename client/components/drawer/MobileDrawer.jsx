import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DrawerItems from './DrawerItems';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: drawerWidth,
      },
}));

export const GET_DRAWER_STATE = gql`
    {
        drawerOpen @client
    }
`;

export default () => {
    const classes = useStyles();
    const { data: { drawerOpen } } = useQuery(GET_DRAWER_STATE);
    console.log(drawerOpen);
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
        >
            <DrawerItems />
        </Drawer>
    )
}
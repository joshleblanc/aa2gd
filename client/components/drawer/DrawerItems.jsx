import { makeStyles } from '@material-ui/styles';
import DrawerToolbar from './DrawerToolbar';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar
}));

export default () => {
    const classes = useStyles();
    return(
        <div>
            <DrawerToolbar />
            <Divider />
            <List>
                <ListItem>
                    <ListItemText primary="test" />
                </ListItem>
            </List>
        </div>
    )
}
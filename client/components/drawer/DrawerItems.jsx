import { makeStyles } from '@material-ui/styles';
import DrawerToolbar from './DrawerToolbar';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import CurrentUserDisplay from '../CurrentUserDisplay';

export default () => {
    return(
        <div>
            <CurrentUserDisplay />
            <Divider />
            <List>
                <ListItem>
                    <ListItemText primary="test" />
                </ListItem>
            </List>
        </div>
    )
}
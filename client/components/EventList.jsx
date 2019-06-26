import * as React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    primaryEventText: {
        display: "block"
    }
});

export default ({events}) => {
    const classes = useStyles();
    return(
        <List>
            {
                events.map((e) => {
                    if(!e.game) return null;
                    return(
                        <ListItem key={e._id}>
                            <ListItemAvatar>
                                <Avatar component="div" src={e.game.iconUrl} />
                            </ListItemAvatar>
                            <ListItemText primary={e.name} secondary={
                                <React.Fragment>
                                    <Typography color="textPrimary" component="span" className={classes.primaryEventText} variant="body2">
                                        {e.game.name}
                                    </Typography>
                                    {moment(e.date).format("YYYY-MM-DD HH:mm")}
                                </React.Fragment>
                            } />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}
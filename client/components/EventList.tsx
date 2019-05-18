import * as React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@material-ui/core';
import moment from 'moment';
import Event from '../types/Event';
import { makeStyles } from '@material-ui/styles';

interface Props {
    events: Array<Event>
}

const useStyles = makeStyles({
    primaryEventText: {
        display: "block"
    }
});

export default ({events}: Props) => {
    const classes = useStyles();
    return(
        <List>
            {
                events.map((e:Event) => {
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
                                    {moment(parseInt(e.date)).format("YYYY-MM-DD HH:mm")}
                                </React.Fragment>
                            } />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}
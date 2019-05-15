import {ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import React from "react";
import ServerAvatar from "./ServerAvatar";
import moment from 'moment';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    primaryEventText: {
        display: "block"
    }
});

export default ({server:s, ...props}) => {
    const classes = useStyles();
    const futureEvents = [];
    const pastEvents = [];
    const currentEvents = [];
    const currentDate = moment();
    s.events.forEach(s => {
        const date = moment(parseInt(s.date));
        if(date.diff(currentDate, 'hours') < -3) {
            pastEvents.push(date);
        } else if(date.isAfter(currentDate)) {
            futureEvents.push(date);
        } else {
            currentEvents.push(date);
        }
        console.log(pastEvents, currentEvents, futureEvents);
    });
    return(
        <ListItem {...props}>
            <ListItemAvatar>
                <ServerAvatar server={s} />
            </ListItemAvatar>
            <ListItemText primary={s.name} secondary={
                <React.Fragment>
                    <Typography color="textPrimary" component="span" className={classes.primaryEventText} variant="body2">{currentEvents.length} events ongoing</Typography>
                    {futureEvents.length} upcoming
                </React.Fragment>


            } />

        </ListItem>
    )
}
import {ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import React from "react";
import ServerAvatar from "./ServerAvatar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    primaryEventText: {
        display: "block"
    }
});

export default ({server:s, ...props}) => {
    const classes = useStyles();
    return(
        <ListItem {...props}>
            <ListItemAvatar>
                <ServerAvatar server={s} />
            </ListItemAvatar>
            <ListItemText primary={s.name} secondary={
                <React.Fragment>
                    <Typography color="textPrimary" component="span" className={classes.primaryEventText} variant="body2">{s.currentEvents.length} events ongoing</Typography>
                    {s.futureEvents.length} upcoming
                </React.Fragment>
            } />

        </ListItem>
    )
}
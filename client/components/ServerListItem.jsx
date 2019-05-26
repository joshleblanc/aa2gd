import {ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import React from "react";
import ServerAvatar from "./ServerAvatar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    primaryEventText: {
        display: "block"
    },
    item: {
        width: 'calc(100% - 16px)',
        padding: '0 !important',
        margin: '8px !important',
    },
    overflow: {
        textOverflow: 'ellipsis'
    }

});

export default ({server:s, ...props}) => {
    const classes = useStyles();
    return(
        <ListItem {...props} className={"nes-container is-rounded " + classes.item}>
            <ListItemAvatar>
                <ServerAvatar server={s} />
            </ListItemAvatar>
            <ListItemText className={classes.overflow} primary={s.name} secondary={
                <React.Fragment>
                    <Typography color="textPrimary" component="span" className={classes.primaryEventText} variant="body2">{s.currentEvents.length} ongoing</Typography>
                    {s.futureEvents.length} upcoming
                </React.Fragment>
            } />

        </ListItem>
    )
}

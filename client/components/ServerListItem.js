import {ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import React from "react";
import ServerAvatar from "./ServerAvatar";

export default ({server:s, ...props}) => {
    return(
        <ListItem {...props}>
            <ListItemAvatar>
                <ServerAvatar server={s} />
            </ListItemAvatar>
            <ListItemText primary={s.name} />
        </ListItem>
    )
}
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import React from "react";

export default ({server:s, ...props}) => {
    return(
        <ListItem {...props}>
            <ListItemAvatar>
                {
                    s.icon
                        ? <Avatar component="div" src={s.iconUrl} />
                        : <Avatar component="div">{s.name.split(' ').map(c => c[0])}</Avatar>
                }
            </ListItemAvatar>
            <ListItemText primary={s.name} />
        </ListItem>
    )
}
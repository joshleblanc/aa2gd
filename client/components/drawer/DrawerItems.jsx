import { Divider, List, ListItemText } from '@material-ui/core';
import CurrentUserDisplay from '../CurrentUserDisplay';
import React from "react";
import LinkListItem from "../LinkListItem";

export default () => {
    return(
        <div>
            <CurrentUserDisplay />
            <Divider component="hr" />
            <List component="ul">
                <LinkListItem href={'/servers'}>
                    <ListItemText primary={"Servers"} />
                </LinkListItem>
                <LinkListItem href={'/create'}>
                    <ListItemText primary={"Create"} />
                </LinkListItem>
            </List>
        </div>
    )
}
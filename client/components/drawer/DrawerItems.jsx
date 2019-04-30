import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import CurrentUserDisplay from '../CurrentUserDisplay';
import Link from 'next/link';
import React from "react";

export default () => {
    return(
        <div>
            <CurrentUserDisplay />
            <Divider component="hr" />
            <List component="ul">
                <Link href={'/servers'}>
                    <ListItem button component="a" href={"/servers"}>
                        <ListItemText primary="Servers" />
                    </ListItem>
                </Link>
            </List>
        </div>
    )
}
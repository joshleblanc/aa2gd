import { Divider, List, ListItemText } from '@material-ui/core';
import CurrentUserDisplay from '../CurrentUserDisplay';
import React from "react";
import LinkListItem from "../LinkListItem";
import useServers from "../../hooks/useServers";
import ServerListItem from "../ServerListItem";
import Link from 'next/link';

export default () => {
    const servers = useServers();
    return(
        <div>
            <CurrentUserDisplay />
            <Divider component="hr" />
            <List component="ul">
                {
                    servers ?
                        servers.map(s => {
                            return(
                                <Link href={`/server?id=${s.id}`}>
                                    <ServerListItem key={s._id} server={s}  component="a" button href={`/server?id=${s.id}`} />
                                </Link>
                            )
                        })
                    : "Loading..."
                }
                <LinkListItem href={'/servers'}>
                    <ListItemText primary={"Servers"} />
                </LinkListItem>
            </List>
        </div>
    )
}
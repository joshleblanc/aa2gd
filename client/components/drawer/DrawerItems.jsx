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
                        servers.sort((a, b) => {
                            return (b.currentEvents.length + b.futureEvents.length) - (a.currentEvents.length + a.futureEvents.length) ;
                        }).map(s => {
                            return(
                                <Link key={s._id} href={`/server?id=${s._id}`}>
                                    <ServerListItem server={s} href={`/server?id=${s._id}`} />
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
import { Divider, List, ListItemText } from '@material-ui/core';
import CurrentUserDisplay from '../CurrentUserDisplay';
import React from "react";
import LinkListItem from "../LinkListItem";
import useServers from "../../hooks/useServers";
import ServerListItem from "../ServerListItem";
import Link from 'next/link';
import Server from "../../types/Server";

export default () => {
    const servers = useServers();
    return(
        <div>
            <CurrentUserDisplay />
            <Divider component="hr" />
            <List component="ul">
                {
                    servers ?
                        servers.sort((a:Server, b:Server) => {
                            return (b.currentEvents!.length + b.futureEvents!.length) - (a.currentEvents!.length + a.futureEvents!.length) ;
                        }).map((s:Server) => {
                            return(
                                <Link key={s._id} href={`/server?id=${s.id}`}>
                                    <ServerListItem server={s} href={`/server?id=${s.id}`} />
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
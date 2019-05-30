import {Divider, List, ListItemText} from '@material-ui/core';
import CurrentUserDisplay from '../CurrentUserDisplay';
import React from "react";
import useServers from "../../hooks/useServers";
import ServerListItem from "../ServerListItem";
import Link from 'next/link';
import ListItem from "@material-ui/core/ListItem";

export default () => {
    const servers = useServers();
    if (!servers) return "Loading...";
    const serversWithEvents = servers.filter(server => server.currentEvents.length + server.futureEvents.length > 0);
    return (
      <div>
          <CurrentUserDisplay/>
          <Divider component="hr"/>
          <List component="ul">
              {
                  serversWithEvents.length > 0 ?
                    serversWithEvents.sort((a, b) => {
                        return (b.currentEvents.length + b.futureEvents.length) - (a.currentEvents.length + a.futureEvents.length);
                    }).map(s => {
                        return (
                          <Link key={s._id} href={`/server?id=${s._id}`}>
                              <ServerListItem button server={s} href={`/server?id=${s._id}`}/>
                          </Link>
                        )
                    })
                    : <ListItem>
                        <ListItemText primary="No events have been created!"/>
                    </ListItem>
              }
          </List>
      </div>
    )
}
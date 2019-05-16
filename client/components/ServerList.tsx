import FixedHeightList from './FixedHeightList';
import React from "react";
import ServerListItem from "./ServerListItem";
import Server from "../types/Server";

interface Props {
    servers: Array<Server>
}

export default ({ servers }:Props) => {
    return (
        <FixedHeightList height={400} title="Servers">
            { 
                servers.map((s:Server) => {
                    return <ServerListItem server={s} key={s.id}/>
                })
            }
        </FixedHeightList>

    )
}
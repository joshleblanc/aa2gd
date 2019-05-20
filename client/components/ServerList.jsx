import FixedHeightList from './FixedHeightList';
import React from "react";
import ServerListItem from "./ServerListItem";

export default ({ servers }) => {
    return (
        <FixedHeightList height={835} title="Servers">
            { 
                servers.map(s => {
                    return <ServerListItem server={s} key={s.id}/>
                })
            }
        </FixedHeightList>

    )
}
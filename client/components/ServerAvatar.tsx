import {Avatar} from "@material-ui/core";
import React from "react";
import Server from "../types/Server";

interface Props {
    server: Server
}

export default ({server}:Props) => {
    return (
        <React.Fragment>
            {
                server.icon
                    ? <Avatar component="div" src={server.iconUrl}/>
                    : <Avatar component="div">{server.name.split(' ').map(c => c[0])}</Avatar>
            }
        </React.Fragment>
    )
}
import {Avatar} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/styles";


export default ({server}) => {
    const classes = useStyles();
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
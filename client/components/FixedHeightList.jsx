import { List, Typography, makeStyles } from '@material-ui/core';
import * as React from "react";

const useStyles = makeStyles({
    serverList: {
        overflowY: 'auto'
    }
});

const FixedHeightList = ({children, height}) => {
    const classes = useStyles();
    return(
        <div>
            <List dense className={classes.serverList} style={{height}}>
                {children}
            </List>
        </div>

    )
};

export default FixedHeightList;
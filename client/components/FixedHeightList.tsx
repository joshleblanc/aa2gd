import { List, Typography, makeStyles } from '@material-ui/core';
import * as React from "react";

const useStyles = makeStyles({
    serverList: {
        overflowY: 'auto'
    }
});

interface Props {
    children: React.ReactNode,
    title: string,
    height: number
}

const FixedHeightList = ({children, title, height}:Props) => {
    const classes = useStyles();
    return(
        <div>
            <Typography variant="h4">{title}</Typography>
            <List dense className={classes.serverList} style={{height}}>
                {children}
            </List>
        </div>

    )
};

export default FixedHeightList;
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from "react";


const drawerWidth = 240;
const useStyles = makeStyles({
    drawerPaper: {
        width: drawerWidth,
      },
});

interface Props {
    children: React.ReactNode,
    open: boolean,
    variant: "permanent" | "temporary" | "persistent" | undefined
}

export default ({children, ...props}:Props) => {
    const classes = useStyles();
    return(
        <Drawer
            classes={{
                paper: classes.drawerPaper
            }}
            {...props}
        >
            {children}
        </Drawer>
    )
};
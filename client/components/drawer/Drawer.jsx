import MobileDrawer from './MobileDrawer';
import DesktopDrawer from './DesktopDrawer';
import {makeStyles} from '@material-ui/styles';
import {Hidden, Theme} from '@material-ui/core';
import React from "react";
import useToken from "../../hooks/useToken";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
}));

export default () => {
    const classes = useStyles();
    const token = useToken();
    if(!token) return null;
    return (
        <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
                <MobileDrawer/>
            </Hidden>
            <Hidden xsDown implementation="css">
                <DesktopDrawer/>
            </Hidden>
        </nav>
    )
}
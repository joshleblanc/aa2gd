import MenuIcon from "@material-ui/icons/Menu";
import {IconButton} from "@material-ui/core";
import React from "react";
import useDrawer from "../hooks/useDrawer";
import {makeStyles} from "@material-ui/styles";
import useToken from "../hooks/useToken";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
}));

export default () => {
    const { toggleDrawer } = useDrawer();
    const token = useToken();
    const classes = useStyles();
    if(!token) return null;
    return(
        <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => toggleDrawer()}
            className={classes.menuButton}
        >
            <MenuIcon />
        </IconButton>
    )
}
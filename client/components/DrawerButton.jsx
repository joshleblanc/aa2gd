import MenuIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {IconButton} from "@material-ui/core";
import React from "react";
import useDrawer from "../hooks/useDrawer";
import {makeStyles} from "@material-ui/styles";

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
    const classes = useStyles();
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
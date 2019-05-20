import React from "react";
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(({spacing}) => ({
    root: {
        padding: spacing(2),
        margin: spacing(1)
    }
}), {withTheme: true});

export default ({children, elevation, className}) => {
    const classes = useStyles();
    return (
        <Paper classes={classes} className={className} elevation={elevation}>{children}</Paper>
    )
};
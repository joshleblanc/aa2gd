import React from "react";
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(({spacing}) => ({
    root: {
        padding: spacing(1.5),
        margin: spacing(2),
        borderRadius: 0,
        border: '4px solid black',
        backgroundColor: 'inherit'
    },
    title: {
        display: 'table',
        padding: '0 0.5rem',
        margin: '-1.8rem 0 1rem',
        backgroundColor: "#303030"
    }
}), {withTheme: true});

export default ({children, title, className}) => {
    const classes = useStyles();
    return (
        <Paper className={className + ' ' + classes.root} elevation={0}>
            <Typography variant={"h6"} className={classes.title}>{title}</Typography>
            {children}
        </Paper>
    )
};
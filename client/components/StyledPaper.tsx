import React, {FunctionComponent} from "react";
import {Paper, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

interface Props {
    elevation?: number,
    className?: string,
}

const useStyles = makeStyles(({spacing}: Theme) => ({
    root: {
        padding: spacing(2),
        margin: spacing(1)
    }
}), {withTheme: true});

const StyledPaper: FunctionComponent<Props> = ({children, elevation, className}) => {
    const classes = useStyles();

    return (
        <Paper classes={classes} className={className} elevation={elevation}>{children}</Paper>
    )
};

export default StyledPaper;
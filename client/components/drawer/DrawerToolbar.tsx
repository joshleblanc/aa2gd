import { makeStyles } from '@material-ui/styles';
import {Theme} from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles((theme:Theme) => ({
    toolbar: theme.mixins.toolbar 
}));

export default () => {
    const classes = useStyles();
    return(
        <div className={classes.toolbar} />
    )
}
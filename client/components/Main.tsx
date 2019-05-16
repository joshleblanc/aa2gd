import { makeStyles } from '@material-ui/styles';
import * as React from "react";
import {Theme} from "@material-ui/core";

const useStyles = makeStyles((theme:Theme)=> ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      }
}));

interface Props {
    children: React.ReactNode
}

export default ({ children }: Props) => {
    const classes = useStyles();
    return(
        <main className={classes.content}>
            {children}
        </main>
    )
}
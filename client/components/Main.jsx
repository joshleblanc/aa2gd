import { makeStyles } from '@material-ui/styles';
import React from "react";

const useStyles = makeStyles({
    content: {
        flexGrow: 1,
        width: '100%',
        margin:'4em'
      }
});

export default ({ children }) => {
    const classes = useStyles();
    return(
        <main className={classes.content}>
            {children}
        </main>
    )
}
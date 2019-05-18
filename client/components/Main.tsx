import { makeStyles } from '@material-ui/styles';
import * as React from "react";

const useStyles = makeStyles({
    content: {
        flexGrow: 1,
        width: '100%'
      }
});

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
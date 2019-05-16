import Link from 'next/link';
import { makeStyles, Link as MuiLink } from '@material-ui/core';
import * as React from "react";

const useStyles = makeStyles({
    link: {
        cursor: 'pointer'
    }
});

export default ({ href, children }: { href: string, children: Array<React.ReactNode>}) => {
    const classes = useStyles();
    return (
        <Link href={href}>
            <MuiLink component={'a'} color={"secondary"} className={classes.link}>
                {children}
            </MuiLink>
        </Link>
    )
}
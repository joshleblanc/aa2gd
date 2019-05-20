import Link from 'next/link';
import { ListItem } from '@material-ui/core';
import * as React from "react";

export default ({href, children}) => {
    return(
        <Link href={href}>
            <ListItem button component="a" href={href}>
                {children}
            </ListItem>
        </Link>
    )
}
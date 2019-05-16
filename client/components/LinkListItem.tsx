import Link from 'next/link';
import { ListItem } from '@material-ui/core';
import * as React from "react";

interface Props {
    href: string,
    children: React.ReactNode
}

export default ({href, children}:Props) => {
    return(
        <Link href={href}>
            <ListItem button component="a" href={href}>
                {children}
            </ListItem>
        </Link>
    )
}
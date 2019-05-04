import Link from 'next/link';
import { ListItem } from '@material-ui/core';

export default ({href, children}) => {
    return(
        <Link href={href}>
            <ListItem button component="a" href={href}>
                {children}
            </ListItem>
        </Link>
    )
}
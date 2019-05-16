import React from "react";
import {Button} from '@material-ui/core';
import Link from 'next/link';

interface Props {
    children: React.ReactNode,
    href: string
}

export default ({children, href}:Props) => (
  <Link href={href}>
    <Button>{children}</Button>
  </Link>
)
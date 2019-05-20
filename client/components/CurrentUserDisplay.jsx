import {Avatar, ListItem, ListItemText, ListItemAvatar, Typography} from "@material-ui/core";
import Link from 'next/link';
import useCurrentUser from '../hooks/useCurrentUser';
import * as React from "react";

export default () => {
  const { data, error, loading } = useCurrentUser();
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Something went wrong</Typography>;
  if(!data.currentUser) return null;
  return(
    <Link href="/profile">
      <ListItem component="a" button href={"/profile"}>
        <ListItemAvatar>
          <Avatar component="div" src={data.currentUser.avatarUrl} alt={"profile picture"} />
        </ListItemAvatar>
        <ListItemText primary={data.currentUser.username} secondary={data.currentUser.email} />
      </ListItem>
    </Link>
    
  )
};

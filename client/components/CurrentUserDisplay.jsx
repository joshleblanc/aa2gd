import {Avatar, ListItem, ListItemText, ListItemAvatar, Typography} from "@material-ui/core";
import Link from 'next/link';
import useCurrentUser from '../hooks/useCurrentUser';
import * as React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  listItem: {
    ...theme.mixins.toolbar
  }
}));

export default () => {
  const { data, error, loading } = useCurrentUser();
  const classes = useStyles();
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Something went wrong</Typography>;
  if(!data.currentUser) return null;
  return(
    <Link href="/profile">
      <ListItem component="a" button href={"/profile"} className={classes.listItem}>
        <ListItemAvatar>
          <Avatar component="div" src={data.currentUser.avatarUrl} alt={"profile picture"} />
        </ListItemAvatar>
        <ListItemText primary={data.currentUser.username} />
      </ListItem>
    </Link>
    
  )
};

import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, ListItem, ListItemText, ListItemAvatar, Icon } from "@material-ui/core";
import Link from 'next/link';
import useCurrentUser from '../hooks/useCurrentUser';

const useStyles = makeStyles(theme => ({

}));

export default () => {
  const classes = useStyles();
  const { data, error, loading } = useCurrentUser();
  if (loading) return "Loading...";
  if (error) return "Something went wrong";
  return(
    <Link href="/profile">
      <ListItem button>
        <ListItemAvatar>
          <Avatar src={data.currentUser.avatar} alt={"profile picture"} />
        </ListItemAvatar>
        <ListItemText primary={data.currentUser.username} secondary={data.currentUser.email} />
      </ListItem>
    </Link>
    
  )
};

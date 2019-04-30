import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, ListItem, ListItemText, ListItemAvatar, Icon } from "@material-ui/core";
import Link from 'next/link';
import useCurrentUser from '../hooks/useCurrentUser';
import useHost from "../hooks/useHost";

export default () => {
  const { data, error, loading } = useCurrentUser();
  const host = useHost();
  if (loading) return "Loading...";
  if (error) return "Something went wrong";
  if(!data.currentUser) {
    return(
      <ListItem button component='a' href={`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${host +  "/authenticate"}&response_type=code&scope=email identify guilds connections`}>
        <ListItemText primary="Login" />
      </ListItem>
    )
  }
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

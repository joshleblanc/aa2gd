import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import useToken from "../hooks/useToken";
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, ListItem, ListItemText, ListItemAvatar, Icon } from "@material-ui/core";
import Link from 'next/link';

const GET_CURRENT_USER = gql`
  query GetCurrentUser($token: String) {
    currentUser(token: $token) {
      username
      avatar
      id
      email
    }
  }
`;

const useStyles = makeStyles(theme => ({

}));

export default () => {
  const token = useToken();
  const classes = useStyles();
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    variables: { token }
  });
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

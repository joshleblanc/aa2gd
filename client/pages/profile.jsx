import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import useCurrentUser from '../hooks/useCurrentUser';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import ServerList from '../components/ServerList'
import ConnectionList from '../components/ConnectionList';

const useStyles = makeStyles(theme => ({
  media: {
    height: 100
  },
  avatar: {
    height: 100,
    width: 100,
    marginLeft: theme.spacing(12),
    marginRight: theme.spacing(12),
    marginTop: -theme.spacing(8),
    borderRadius: 50
  },
  headerContent: {
    marginTop: -theme.spacing(14),
    marginLeft: theme.spacing(16),
    padding: theme.spacing(1)
  }
}));
const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;
export default () => {
  const classes = useStyles();
  const logout = useMutation(LOGOUT);
  const { data, loading, error } = useCurrentUser();
  if(loading) return "Loading...";
  if(error) return "Error";
  if(!data.currentUser) {
    return "You're not logged in!"
  }
  console.log(data.currentUser);
  return(
    <Card>
      <CardMedia 
        component="img"
        className={classes.media}
        image="https://picsum.photos/1920/1080"
      />
      <CardMedia 
        className={classes.avatar}
        component="img"
        image={data.currentUser.avatarUrl}
      />
      <CardContent>
        <Button onClick={logout} >Logout</Button>
        <ConnectionList connections={data.currentUser.connections} />
        <ServerList servers={data.currentUser.servers}/>
      </CardContent>
    </Card>
  )
}
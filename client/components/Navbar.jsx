import React from "react";
import {AppBar, Toolbar, Button} from '@material-ui/core';
import LinkButton from './LinkButton';
import gql from 'graphql-tag';
import { useQuery, useMutation } from "react-apollo-hooks";
import CurrentUserName from './CurrentUserName';
import useToken from '../hooks/useToken';

const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;

export default () => {
  const token = useToken();
  const logout = useMutation(LOGOUT);
  return(
    <AppBar position={"static"}>
    <Toolbar>
      <LinkButton href='/'>Home</LinkButton>
      {
        token 
          ? <Button onClick={logout}>Logout</Button> 
          : <Button component='a' href={`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.DISCORD_REDIRECT_URL}&response_type=code&scope=email identify guilds connections`}>Login with Discord</Button>
      }
      <CurrentUserName />
    </Toolbar>
  </AppBar>
  )
  
}
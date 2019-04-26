import React from "react";
import {AppBar, Toolbar, Button} from '@material-ui/core';
import LinkButton from './LinkButton';
import gql from 'graphql-tag';
import { useQuery, useMutation } from "react-apollo-hooks";
import CurrentUserName from './CurrentUserName';

const GET_TOKEN = gql`
  {
    token @client
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;

export default () => {
  const { data } = useQuery(GET_TOKEN);
  const logout = useMutation(LOGOUT);
  return(
    <AppBar position={"static"}>
    <Toolbar>
      <LinkButton href='/'>Home</LinkButton>
      <Button component='a' href={`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.DISCORD_REDIRECT_URL}&response_type=code&scope=email identify guilds connections`}>Login with Discord</Button>
      <CurrentUserName />
    </Toolbar>
  </AppBar>
  )
  
}
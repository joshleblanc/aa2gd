import React from 'react';
import gql from 'graphql-tag';
import {useQuery, useMutation} from 'react-apollo-hooks';
import StyledPaper from '../components/StyledPaper';
import Cookies from 'js-cookie';
import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";
import useCurrentUser from "../hooks/useCurrentUser";
import SteamForm from "../components/SteamForm";
import Button from "../components/Button";

const GET_DISCORD_TOKEN = gql`
    query GetDiscordToken($code: String!) {
        getDiscordToken(code: $code)
    }
`;

const SET_TOKEN = gql`
  mutation SetToken($token: String!) {
    setToken(token: $token) @client
  }
`;



export default ({router}) => {
    const {error, loading, data} = useQuery(GET_DISCORD_TOKEN, {
        variables: {
            code: router.query.code
        }
    });
    const setToken = useMutation(SET_TOKEN);

    const currentUserQuery = useCurrentUser();
    if (loading || currentUserQuery.loading) return "Loading...";
    if (error || currentUserQuery.error) return "Error";
    setToken({variables: {token: data.getDiscordToken}});
    Cookies.set('token', data.getDiscordToken);
    if (currentUserQuery.data.currentUser && currentUserQuery.data.currentUser.games.length === 0) {
        return (
          <SteamForm />
        )
    }
    return (
      <StyledPaper>
          <Typography gutterBottom>
              You're all set.
          </Typography>
          <Typography>

              <Link href={'/profile'}>
                  <Button variant="info">
                      Click here
                  </Button>

              </Link>
              to go to your profile.
          </Typography>


      </StyledPaper>
    );
}

import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';
import StyledPaper from '../components/StyledPaper';
import Cookies from 'js-cookie';


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
    const { error, loading, data} = useQuery(GET_DISCORD_TOKEN, {
        variables: {
            code: router.query.code
        }
    });
    const setToken = useMutation(SET_TOKEN);
    if(loading) return "Loading...";
    if(error) return "Error";
    setToken({variables: { token: data.getDiscordToken }});
    Cookies.set('token', data.getDiscordToken);

    console.log(data.getDiscordToken);
    return(
        <StyledPaper>
            You're good to go!
        </StyledPaper>
    );
}

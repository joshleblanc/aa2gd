import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

const GET_DISCORD_TOKEN = gql`
    query GetDiscordToken($code: String!) {
        getDiscordToken(code: $code)
    }
`;

export default ({router}) => {
    const { error, loading, data} = useQuery(GET_DISCORD_TOKEN, {
        variables: {
            code: router.query.code
        }
    });
    console.log(error);
    if(loading) return "Loading...";
    if(error) return "Error";
    console.log(data);
    return(null);
}

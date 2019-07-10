import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import resolvers from './resolvers';
import ApolloClient from "apollo-client";
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";
import Cookies from 'js-cookie';
import gql from 'graphql-tag';

const GET_TOKEN = gql`
    {
        token @client
    }
`;

let client = null;
function create(initialState, host) {
    const cache = new InMemoryCache({
        dataIdFromObject: object => object._id || null
    }).restore(initialState || {});
    const authLink = setContext((_, {headers}) => {
        const { token } = cache.readQuery({ query: GET_TOKEN });
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
                source: host
            }
        }
    })
    const errorLink = onError(({ graphQLErrors }) => {
        console.log("Something went wrong with the query: ", graphQLErrors);
        if(graphQLErrors && graphQLErrors.some(e => e.message === "Access denied! You need to be authorized to perform this action!")) {
            console.log("Permission denied");
            cache.writeData({
                data: {
                    token: null
                }
            });
            Cookies.remove('token');
        }
    })

    const link = createHttpLink({
        uri: host + "/api/graphql",
        fetch: fetch,
        credentials: 'same-origin'
    })
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser,
        link: authLink.concat(errorLink).concat(link),
        cache,
        resolvers
    });
}

export default function initApolloClient(initialState, host) {
    if (!process.browser) {
        return create(initialState, host);
    }

    if (!client) {
        client = create(initialState, host);
    }
    return client;
}

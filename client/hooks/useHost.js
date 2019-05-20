import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const GET_HOST = gql`
    query GetHost {
        host @client
    }
`;

export default () => {
    const { data } = useQuery(GET_HOST);
    return data.host;
}
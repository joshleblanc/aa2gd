import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const GET_OFFSET = gql`
    {
        offset @client
    }
`;

export default () => {
    const { data } = useQuery(GET_OFFSET);
    return data.offset;
}

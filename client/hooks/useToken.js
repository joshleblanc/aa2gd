import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const GET_TOKEN = gql`
  {
    token @client
  }
`;

export default () => {
  const { data } = useQuery(GET_TOKEN);
  return data.token;
}
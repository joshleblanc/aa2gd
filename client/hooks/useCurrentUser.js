import gql from 'graphql-tag';
import useToken from './useToken';
import { useQuery } from 'react-apollo-hooks';

const GET_CURRENT_USER = gql`
  query GetCurrentUser($token: String) {
    currentUser(token: $token) {
      username
      avatar
      avatarUrl
      id
      email
      connections {
        id
        type
        name
      }
      servers {
        id
        name
        icon
        iconUrl
      }
    }
  }
`;

export default () => {
  const token = useToken();
  return useQuery(GET_CURRENT_USER, {
    variables: {
      token
    }
  });
}
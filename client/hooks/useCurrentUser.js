import gql from 'graphql-tag';
import useToken from './useToken';
import { useQuery } from 'react-apollo-hooks';

const GET_CURRENT_USER = gql`
  query GetCurrentUser($token: String) {
    currentUser(token: $token) {
      _id
      username
      avatar
      avatarUrl
      id
      email
      connections {
        _id
        id
        type
        name
      }
      servers {
        _id
        id
        name
        icon
        iconUrl
      }
      timeTable {
        Mo Tu We Th Fr Sa Su
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
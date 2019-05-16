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
        events {
          _id
          date
        }
      }
      timeTable {
        Mo Tu We Th Fr Sa Su
      },
      games {
        _id
        name
        logoUrl
        iconUrl
        events {
          _id
          date
        }
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
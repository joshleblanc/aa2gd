import { useQuery } from "react-apollo-hooks";
import gql from 'graphql-tag';

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      username
    }
  }
`;

export default () => {
    const { data, error, loading } = useQuery(GET_CURRENT_USER);
    if(loading) return "Loading...";
    if(error) return "Something went wrong";
    return data.currentUser.username;
}
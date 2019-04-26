import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import useToken from "../hooks/useToken";

const GET_CURRENT_USER = gql`
  query GetCurrentUser($token: String) {
    currentUser(token: $token) {
      username
      avatar
      id
    }
  }
`;

export default () => {
  const token = useToken();
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    variables: { token }
  });
  if (loading) return "Loading...";
  if (error) return "Something went wrong";
  console.log(data.currentUser);
  return data.currentUser && data.currentUser.username;
};

import { useMutation, useQuery } from "react-apollo-hooks";
import gql from 'graphql-tag';

export const GET_DRAWER_STATE = gql`
    {
        drawerOpen @client
    }
`;

export const TOGGLE_DRAWER = gql`
  mutation ToggleDrawer {
    toggleDrawer @client
  }
`;


export default () => {
  const { data } = useQuery(GET_DRAWER_STATE);
  return {
    toggleDrawer: useMutation(TOGGLE_DRAWER),
    drawerOpen: data.drawerOpen
  }
}
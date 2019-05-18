import gql from "graphql-tag";
import {useQuery} from "react-apollo-hooks";

const GET_SERVER = gql`
    query Server($id: ID!) {
        server(id: $id) {
            _id
            id
            name
            iconUrl
            users {
                _id
                id
                username
                avatar
                avatarUrl
            }
            events {
                _id
                name
                date
                game {
                    _id
                    name
                    iconUrl
                }
            }
        }
    }
`;

export default (id:string) => {
    return useQuery(GET_SERVER, {
        variables: { id }
    });
}
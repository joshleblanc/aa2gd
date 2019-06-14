import gql from "graphql-tag";
import {useQuery} from "react-apollo-hooks";

const GET_WEBHOOKS = gql`
    query Webhooks($userId: ID!, $serverId: ID!) {
        webhooks(userId: $userId, serverId: $serverId) {
            _id
            name
            url
            creator {
                _id
            }
            server {
                _id
            }

        }
    }
`;

export default (userId, serverId) => {
    return useQuery(GET_WEBHOOKS, {
        variables: {
            userId, serverId
        }
    });

}
import React from "react";
import Typography from "@material-ui/core/Typography";
import {useQuery} from "react-apollo-hooks";
import gql from 'graphql-tag';

const GET_SERVER = gql`
    query Server($id: ID!) {
        server(id: $id) {
            _id
            id
            name        
        }
    }
`;

export default ({router}) => {
    const { data, error, loading } = useQuery(GET_SERVER, {
        variables: { id: router.query.id }
    });
    return(
        <React.Fragment>
            <Typography variant="h4">{}</Typography>
        </React.Fragment>
    )
}
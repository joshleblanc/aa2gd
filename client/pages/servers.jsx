import {List, Typography, ListItem, ListItemText} from '@material-ui/core';
import React from "react";
import {useQuery} from "react-apollo-hooks";
import gql from 'graphql-tag';
import useCurrentUser from "../hooks/useCurrentUser";
import ServerList from "../components/ServerList";
import Link from 'next/link';
import ServerListItem from "../components/ServerListItem";

const GET_SERVERS = gql`
    query Servers($token: String!) {
        servers {
            _id
            id
            name
        }
    }
`

export default () => {
    const { data, error, loading } = useCurrentUser();
    if(error) return "Error";
    if(loading) return "Loading";
    return(
        <React.Fragment>
            <Typography>These are the servers you're a part of</Typography>
            {
                data.currentUser.servers.map(s => {
                    return(
                        <Link href={`/server?id=${s.id}`} key={s.id}>
                            <ServerListItem server={s} button href={`/server?id=${s.id}`} component="a"/>
                        </Link>
                    )
                })
            }
        </React.Fragment>

    )
}
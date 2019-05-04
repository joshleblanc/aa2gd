import React from "react";
import Typography from "@material-ui/core/Typography";
import {useQuery} from "react-apollo-hooks";
import gql from 'graphql-tag';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import StyledPaper from "../components/StyledPaper";
import {Avatar, ListItemAvatar} from "@material-ui/core";
import Link from "next/link";

const GET_SERVER = gql`
    query Server($id: ID!) {
        server(id: $id) {
            _id
            id
            name     
            users {
                _id
                id
                username
                avatar
                avatarUrl
            }   
        }
    }
`;

export default ({router}) => {
    const { data, error, loading } = useQuery(GET_SERVER, {
        variables: { id: router.query.id }
    });
    if(error) return "Error";
    if(loading) return "Loading...";
    return(
        <React.Fragment>
            <StyledPaper>
                <Typography variant="h4" gutterBottom>{data.server.name}</Typography>
            </StyledPaper>
            <StyledPaper>
                <Typography variant={"h5"}>Events</Typography>

            </StyledPaper>
            <StyledPaper>
                <Typography variant="h5">Users</Typography>
                <List component="ul">
                    {
                        data.server.users.map(u => {
                            return(
                                <Link href={`/user?id=${u.id}`}>
                                    <ListItem component="li" button component="a" href={`/user?id=${u.id}`}>
                                        <ListItemAvatar>
                                            {
                                                u.avatar
                                                    ? <Avatar component="div" src={u.avatarUrl} />
                                                    : <Avatar component="div">{u.username.split(' ').map(c => c[0])}</Avatar>
                                            }
                                        </ListItemAvatar>
                                        <ListItemText primary={u.username} />
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                </List>
            </StyledPaper>
        </React.Fragment>

    )
}
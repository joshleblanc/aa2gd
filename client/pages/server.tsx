import React from "react";
import Typography from "@material-ui/core/Typography";
import {useQuery} from "react-apollo-hooks";
import gql from 'graphql-tag';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import StyledPaper from "../components/StyledPaper";
import {Avatar, ListItemAvatar, Theme} from "@material-ui/core";
import Link from "next/link";
import {makeStyles} from "@material-ui/styles";
import Router from "../types/Router";
import User from "../types/User";
import Event from '../types/Event';

const useStyles = makeStyles((theme:Theme) => ({
    nameContainer: {
        display: 'flex'
    },
    name: {
        margin: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(1)
    }
}));

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
            } 
        }
    }
`;

export default ({router}: { router: Router }) => {
    const { data, error, loading } = useQuery(GET_SERVER, {
        variables: { id: router.query.id }
    });
    const classes = useStyles();
    if(error) return "Error";
    if(loading) return "Loading...";
    return(
        <React.Fragment>
            <StyledPaper>
                <Avatar src={data.server.iconUrl} className={classes.avatar} />
                <Typography variant="h4" gutterBottom className={classes.name}>{data.server.name}</Typography>
            </StyledPaper>
            <StyledPaper>
                <Typography variant={"h5"}>Events</Typography>
                {
                    data.server.events.length > 0 
                        ? data.server.events.map((e:Event) => {
                            return(
                                <Typography key={e._id}>{e.name}</Typography>
                            )
                        })
                        : <Typography variant="caption">No events have been listed :(</Typography>
                    
                }
            </StyledPaper>
            <StyledPaper>
                <Typography variant="h5">Users</Typography>
                <List component="ul">
                    {
                        data.server.users.map((u:User) => {
                            return(
                                <Link href={`/user?id=${u.id}`}>
                                    <ListItem button component="a" href={`/user?id=${u.id}`}>
                                        <ListItemAvatar>
                                            {
                                                u.avatar
                                                    ? <Avatar component="div" src={u.avatarUrl} />
                                                    : <Avatar component="div">{u.username.split(' ').map((c:string) => c[0])}</Avatar>
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
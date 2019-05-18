import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import StyledPaper from "../components/StyledPaper";
import {Avatar, Grid, ListItemAvatar, Theme} from "@material-ui/core";
import Link from "next/link";
import {makeStyles} from "@material-ui/styles";
import Router from "../types/Router";
import User from "../types/User";
import EventTabs from "../components/EventTabs";
import useServer from "../hooks/useServer";
import DayTabs from "../components/DayTabs";

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

export default ({router}: { router: Router }) => {
    const { data, error, loading } = useServer(router.query.id as string);
    const classes = useStyles();
    if(error) return "Error";
    if(loading) return "Loading...";
    console.log(data.server);
    return(
        <Grid container>
            <Grid item xs={12}>
                <StyledPaper className={classes.nameContainer}>
                    <Avatar src={data.server.iconUrl} className={classes.avatar} />
                    <Typography variant="h4" gutterBottom className={classes.name}>{data.server.name}</Typography>
                </StyledPaper>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledPaper>
                    <Typography variant={"h5"}>Events</Typography>
                    <EventTabs events={data.server.events}/>
                </StyledPaper>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledPaper>
                    <Typography variant="h5">User Availability</Typography>
                    <DayTabs users={data.server.users} />
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
            </Grid>
        </Grid>

    )
}
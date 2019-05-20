import React from "react";
import Typography from "@material-ui/core/Typography";
import StyledPaper from "../components/StyledPaper";
import {Avatar, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Router from "../types/Router";
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
                    <DayTabs id={data.server._id} max={data.server.users.length} />
                </StyledPaper>
            </Grid>
        </Grid>

    )
}
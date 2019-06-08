import React from "react";
import Typography from "@material-ui/core/Typography";
import StyledPaper from "../components/StyledPaper";
import {Grid} from "@material-ui/core";
import EventTabs from "../components/EventTabs";
import useServer from "../hooks/useServer";
import DayTabs from "../components/DayTabs";
import HeaderPaper from "../components/HeaderPaper";
import Button from "../components/Button";

export default ({router}) => {
    const { data, error, loading } = useServer(router.query.id);
    if(error) return "Error";
    if(loading) return "Loading...";
    return(
        <Grid container>
            <Grid item xs={12}>
                <HeaderPaper title={data.server.name} imgUrl={data.server.iconUrl} >
                    <Button>Webhooks</Button>
                </HeaderPaper>
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
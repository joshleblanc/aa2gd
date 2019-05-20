import React from 'react';
import StyledPaper from '../components/StyledPaper';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <StyledPaper>
                    <Typography variant="h6">
                        Login to get started
                    </Typography>
                    <Typography variant="body2">
                        Sign in with discord and create events for any of the channels you're apart of.
                        Enter your availability to let event creators know when you're available.
                    </Typography>
                    <Typography variant="body2">
                        Our system will let the event creator know how many people are available based on the server,
                        game, date, and time selected.
                    </Typography>
                </StyledPaper>
            </Grid>
        </Grid>
    )
}
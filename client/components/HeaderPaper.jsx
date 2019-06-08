import {Avatar, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import StyledPaper from "./StyledPaper";
import React from "react";
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    nameContainer: {
        display: 'flex'
    },
    name: {
        margin: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(1)
    },
    grow: {
        flexGrow: 1
    }
}));

export default ({imgUrl, title, children}) => {
    const classes = useStyles();
    return(
        <StyledPaper>
            <Grid container>
                <Grid item xs={12} className={classes.nameContainer}>
                    <Avatar src={imgUrl} className={classes.avatar} />
                    <Typography variant="h4" gutterBottom className={classes.name}> {title}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.nameContainer}>
                    <div className={classes.grow} />
                    {children}
                </Grid>
            </Grid>

        </StyledPaper>
    )
}

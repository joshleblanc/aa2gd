import {Avatar, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import StyledPaper from "./StyledPaper";
import React from "react";
import {makeStyles} from "@material-ui/styles";

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

interface Props {
    imgUrl: string,
    title: string,
    children?: React.ReactNode
}

export default ({imgUrl, title, children}: Props) => {
    const classes = useStyles();
    return(
        <StyledPaper className={classes.nameContainer}>
            <Avatar src={imgUrl} className={classes.avatar} />
            <Typography variant="h4" gutterBottom className={classes.name}>{title}</Typography>
            {children}
        </StyledPaper>
    )
}
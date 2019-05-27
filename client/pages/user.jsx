import {Card, CardMedia, CardContent, Typography, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo-hooks';
import ConnectionList from '../components/ConnectionList';
import TimeTable from "../components/TimeTable";
import StyledPaper from "../components/StyledPaper";
import Grid from "@material-ui/core/Grid";
import * as React from 'react';

const useStyles = makeStyles(theme => ({
    media: {
        height: 100
    },
    avatar: {
        height: 100,
        width: 100,
        marginLeft: theme.spacing(12),
        marginRight: theme.spacing(12),
        marginTop: -theme.spacing(8),
        borderRadius: 50
    },
    headerContent: {
        marginTop: -theme.spacing(14),
        marginLeft: theme.spacing(16),
        padding: theme.spacing(1)
    },
    table: {
        width: '100%'
    }
}));

const GET_USER = gql`
    query User($id: ID!) {
        user(id: $id) {
            _id
            id
            username
            connections {
                _id
                id
                name
                type
            }
            avatar
            avatarUrl
            timeTable {
                Mo Tu We Th Fr Sa Su
            }
        }
    }
`;

export default ({router}) => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(GET_USER, {
        variables: {id: router.query.id}
    });
    if (loading) return "Loading...";
    if (error) return "Error";
    return (
        <React.Fragment>
            <Card>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image="https://picsum.photos/1920/1080"
                />
                <CardMedia
                    className={classes.avatar}
                    component="img"
                    image={data.user.avatarUrl}
                />
                <CardContent>
                    <Typography variant="h6">{data.user.username}</Typography>
                </CardContent>
            </Card>
            <Grid container>
                <Grid item xs={12}>
                    <StyledPaper>
                        <TimeTable timeTable={data.user.timeTable}/>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12}>
                    <StyledPaper>
                        <ConnectionList connections={data.user.connections}/>
                    </StyledPaper>
                </Grid>
            </Grid>
        </React.Fragment>

    )
}

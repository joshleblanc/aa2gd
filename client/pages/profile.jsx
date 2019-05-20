import {Button} from '@material-ui/core';
import useCurrentUser from '../hooks/useCurrentUser';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';
import ServerList from '../components/ServerList'
import ConnectionList from '../components/ConnectionList';
import React from "react";
import TimeTable from "../components/TimeTable";
import Grid from "@material-ui/core/Grid";
import StyledPaper from "../components/StyledPaper";
import HeaderPaper from "../components/HeaderPaper";

const LOGOUT = gql`
    mutation Logout {
        logout @client
    }
`;

export default () => {
    const logout = useMutation(LOGOUT);
    const {data, loading, error} = useCurrentUser();
    if (loading) return "Loading...";
    if (error) return "Error";
    if (!data.currentUser) {
        return "You're not logged in!"
    }
    return(
        <React.Fragment>
            <Grid item xs={12}>
                <HeaderPaper imgUrl={data.currentUser.avatarUrl} title={data.currentUser.username}>
                    <Button onClick={() => logout()}>Logout</Button>
                </HeaderPaper>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                    <StyledPaper>
                        <TimeTable editable timeTable={data.currentUser.timeTable} _id={data.currentUser._id}/>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={6}>
                            <StyledPaper>
                                <ServerList servers={data.currentUser.servers}/>
                            </StyledPaper>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <StyledPaper>
                                <ConnectionList connections={data.currentUser.connections}/>
                            </StyledPaper>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </React.Fragment>

    )
}
import useCurrentUser from '../hooks/useCurrentUser';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';
import ServerList from '../components/ServerList'
import ConnectionList from '../components/ConnectionList';
import React, {useState} from "react";
import TimeTable from "../components/TimeTable";
import Grid from "@material-ui/core/Grid";
import StyledPaper from "../components/StyledPaper";
import HeaderPaper from "../components/HeaderPaper";
import Button from "../components/Button";
import {Dialog} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import SteamForm from "../components/SteamForm";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";

const LOGOUT = gql`
    mutation Logout {
        logout @client
    }
`;

export default () => {
    const logout = useMutation(LOGOUT);
    const {data, loading, error} = useCurrentUser();
    const [steamDialog, setSteamDialog] = useState(false);
    if (loading) return "Loading...";
    if (error) return "You need to be logged in to go here";
    if (!data.currentUser) {
        return "You're not logged in!"
    }
    return(
        <React.Fragment>
            <Grid item xs={12}>
                <HeaderPaper imgUrl={data.currentUser.avatarUrl} title={data.currentUser.username}>
                    {
                        data.currentUser.games.length === 0 &&
                        <Button onClick={() => setSteamDialog(true)}>Connect Steam</Button>
                    }
                    <Button onClick={logout} variant="error">Logout</Button>
                </HeaderPaper>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                    <StyledPaper title={"Times Available"}>
                        <TimeTable editable timeTable={data.currentUser.timeTable} _id={data.currentUser._id}/>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={6}>
                            <StyledPaper title="Servers">
                                <ServerList servers={data.currentUser.servers}/>
                            </StyledPaper>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <StyledPaper title="Connections">
                                <ConnectionList connections={data.currentUser.connections}/>
                            </StyledPaper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={steamDialog}>
                <DialogContent>
                    <SteamForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSteamDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
}

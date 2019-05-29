import Typography from "@material-ui/core/Typography";
import TextField from "./TextField";
import Button from "./Button";
import StyledPaper from "./StyledPaper";
import React, {useState} from "react";
import {useSnackbar} from "notistack";
import gql from "graphql-tag";
import {useMutation} from "react-apollo-hooks";

const SET_STEAM_ID = gql`
  mutation SetSteamID($name: String!) {
    setSteamID(name: $name) {
        _id
        games {
            _id
            name
            logoUrl
            iconUrl
            events {
              _id
              date
            }
        }
    }
  }
`;

export default () => {
    const {enqueueSnackbar} = useSnackbar();
    const [steamName, setSteamName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const setSteamID = useMutation(SET_STEAM_ID, {
        variables: {name: steamName}
    });

    return (
      <StyledPaper title="Oops!">
          <Typography>
              Looks like you need to connect your steam account!
          </Typography>
          <Typography paragraph>
              Enter your steam ID below to get your games
          </Typography>
          <Typography variant="caption" paragraph>
              Your ID looks like:
              <br />
              https://steamcommunity/id/{"<YOUR ID HERE>"}
              <br />
              or
              <br />
              https://steamcommunity/profiles/{"<YOUR ID HERE>"}
          </Typography>
          <TextField label="Steam ID" value={steamName} onChange={e => setSteamName(e.target.value)}/>
          <Button onClick={async () => {
              try {
                  setSubmitting(true);
                  await setSteamID();
                  enqueueSnackbar("All done!", {variant: "success"});
              } catch (e) {
                  console.log(e);
                  enqueueSnackbar("No user found with that ID", {variant: "error"});
              } finally {
                  setSubmitting(false);
              }
          }} disabled={submitting} variant="primary">
              Submit
          </Button>
      </StyledPaper>
    )
}
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
          <Typography>
              Enter your steam name below to get your games
          </Typography>
          <TextField label="Steam name" value={steamName} onChange={e => setSteamName(e.target.value)}/>
          <Button onClick={async () => {
              try {
                  setSubmitting(true);
                  await setSteamID();
                  enqueueSnackbar("All done!", {variant: "success"});
              } catch (e) {
                  console.log(e);
                  enqueueSnackbar("No user found with that nickname", {variant: "error"});
              } finally {
                  setSubmitting(false);
              }
          }} disabled={submitting} variant="primary">
              Submit
          </Button>
      </StyledPaper>
    )
}
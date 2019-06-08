import Dialog from "./Dialog";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import useWebhooks from "../hooks/useWebhooks";
import {Typography} from "@material-ui/core";
import Button from "./Button";


const Content = ({data}) => {
    console.log(data);
    if (data.length === 0) {
        return <Typography gutterBottom>No webhooks registered</Typography>
    }
};

export default ({open, onClose, userId, serverId}) => {
    const {data, error, loading} = useWebhooks(userId, serverId);
    return (
      <React.Fragment>
          <Dialog open={open} onClose={onClose}>
              <DialogTitle disableTypography>
                  <Typography variant="h5">Webhooks</Typography>
                  <Typography variant="caption" gutterBottom>
                      You can register webhooks here to get notifications of events in your server.
                  </Typography>
              </DialogTitle>
              <DialogContent>
                  {
                      loading || error ? "Loading..." : <Content data={data.webhooks}/>
                  }
                  <Button>Add webhook</Button>
              </DialogContent>
          </Dialog>
      </React.Fragment>

    );
}
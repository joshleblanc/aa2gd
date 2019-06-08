import Dialog from "./Dialog";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import useWebhooks from "../hooks/useWebhooks";


const Content = ({data}) => {
    console.log(data);
    return(
      null
    )
};

export default ({open, onClose, userId, serverId}) => {
    const { data, error, loading } = useWebhooks(userId, serverId);
    return (
      <Dialog open={open} onClose={onClose}>
          <DialogTitle>Webhooks</DialogTitle>
          <DialogContent>
              {
                  loading || error ? "Loading..." : <Content data={data.webhooks} />
              }
          </DialogContent>
      </Dialog>
    );
}
import {Dialog, withMobileDialog} from "@material-ui/core";
import React from "react";

export default withMobileDialog() (({fullScreen, open, onClose, children}) => {
    return (
      <Dialog fullScreen={fullScreen} open={open} fullWidth onClose={onClose} classes={{paper: "nes-dialog"}}
              PaperComponent="dialog">
          {children}
      </Dialog>
    )
});
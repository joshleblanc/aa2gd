import {Drawer} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import * as React from "react";


const drawerWidth = 240;
const useStyles = makeStyles({
    drawerPaper: {
        width: drawerWidth,
        borderRight: '1px solid black'
    },
});

export default ({children, ...props}) => {
    const classes = useStyles();
    return (
      <Drawer
        classes={{
            paper: classes.drawerPaper
        }}
        {...props}
      >
          {children}
      </Drawer>
    )
};
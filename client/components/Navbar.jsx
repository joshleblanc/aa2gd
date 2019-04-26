import React from "react";
import {AppBar, Toolbar, Button, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LinkButton from './LinkButton';
import gql from 'graphql-tag';
import { useQuery, useMutation } from "react-apollo-hooks";
import CurrentUserName from './CurrentUserName';
import useToken from '../hooks/useToken';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: 240,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${240}px)`,
    },
  }
}));

const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;

const TOGGLE_DRAWER = gql`
  mutation ToggleDrawer {
    toggleDrawer @client
  }
`;

export default () => {
  const token = useToken();
  const logout = useMutation(LOGOUT);
  const toggleDrawer = useMutation(TOGGLE_DRAWER);
  const classes = useStyles();
  return(
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={toggleDrawer}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
  
}
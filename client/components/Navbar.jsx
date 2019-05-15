import React from "react";
import {AppBar, Toolbar, Button, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import gql from 'graphql-tag';
import { useMutation } from "react-apollo-hooks";
import useToken from '../hooks/useToken';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import useDrawer from '../hooks/useDrawer';


const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: 240,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${240}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1
  }
}));

const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;


export default () => {
  const { toggleDrawer } = useDrawer();
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
        <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
          Famti.me
        </Typography>
        <Link href={'/create'}>
          <Button component="a" href={'/create'}>
            Create Event
          </Button>
        </Link>

      </Toolbar>
    </AppBar>
  )
  
}
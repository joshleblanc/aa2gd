import React from "react";
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import useToken from "../hooks/useToken";
import useHost from "../hooks/useHost";
import DrawerButton from "./DrawerButton";


const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: 240,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${240}px)`,
    },
    borderBottom: '1px solid black'
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

export default () => {
  const token = useToken();
  const host = useHost();
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={token && classes.appBar} elevation={0} color="inherit">
      <Toolbar>
        <DrawerButton />
        <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
          Famti.me
        </Typography>
        {
          token 
            ? <Link href={'/create'}>
                <Button component="a" href={'/create'}>
                  Create Event
                </Button>
              </Link>
            : <Button component="a" href={`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${host + "/authenticate"}&response_type=code&scope=email identify guilds connections`}>
                Login with discord
              </Button>
        }
      </Toolbar>
    </AppBar>
  )

}
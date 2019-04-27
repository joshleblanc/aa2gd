import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import useCurrentUser from '../hooks/useCurrentUser';

const useStyles = makeStyles(theme => ({
  media: {
    height: 100
  },
  avatar: {
    height: 100,
    width: 100,
    margin: theme.spacing(4),
    marginTop: -theme.spacing(4)
  },
  headerContent: {
    marginTop: -theme.spacing(14),
    marginLeft: theme.spacing(16)
  }
}));

export default () => {
  const classes = useStyles();
  const { data, loading, error } = useCurrentUser();
  if(loading) return "Loading...";
  if(error) return "Error";

  return(
    <Card>
      <CardMedia 
        component="img"
        className={classes.media}
        image="https://picsum.photos/200/200"
      />
      <CardMedia 
        className={classes.avatar}
        component="img"
        image={data.currentUser.avatar}
      />
      <CardContent className={classes.headerContent}>
        <Typography>Test</Typography>
      </CardContent>
    </Card>
  )
}
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
      }
}));

export default ({ children }) => {
    const classes = useStyles();
    return(
        <main className={classes.content}>
            {children}
        </main>
    )
}
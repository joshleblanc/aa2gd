import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar 
}));

export default () => {
    const classes = useStyles();
    return(
        <div className={classes.toolbar} />
    )
}
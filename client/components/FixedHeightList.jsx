import { List, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    serverList: {
        overflow: 'scroll'
    }
});

export default ({children, title, height}) => {
    const classes = useStyles();
    return(
        <div>
            <Typography variant="h4">{title}</Typography>
            <List dense className={classes.serverList} style={{height}}>
            {children}
            </List>
        </div>
        
    )
}
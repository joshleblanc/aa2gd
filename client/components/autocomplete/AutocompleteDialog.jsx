import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, {useMemo, useState} from "react";
import withMobileDialog from "@material-ui/core/withMobileDialog/withMobileDialog";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    list: {
        overflowY: 'auto',
        height: 'calc(100% - 68px)'
    }
}));

export default withMobileDialog()(({fullScreen, label, options, open, onClose, title, onSelect, name}) => {
    const [ search, setSearch ] = useState('');
    const classes = useStyles();

    const filteredOptions = useMemo(() => {
        const limit = 25;
        const selectedOptions = options.filter(o => o.name.toLowerCase().startsWith(search.toLowerCase()));
        return selectedOptions.slice(0, limit);
    }, [options, search]);

    return(
        <Dialog fullScreen={fullScreen} open={open} fullWidth onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label={label}
                    margin="normal"
                    onChange={e => setSearch(e.target.value)}
                    inputProps={{
                        onKeyUp: e => {
                            if(e.keyCode === 13) {
                                const selectedOption = filteredOptions[0];
                                if(selectedOption) {
                                    onSelect({
                                        target: {
                                            name,
                                            value: selectedOption.value
                                        }
                                    });
                                    onClose();
                                }

                            }
                        }
                    }}
                    value={search}
                    autoFocus
                />
                <Typography variant="caption">Type something to search</Typography>
                <List className={classes.list}>
                    {
                        filteredOptions.map(o => {
                            return(
                                <ListItem dense button key={o.value} value={o.value} onClick={() => {
                                    console.log(o.value);
                                    onSelect({
                                        target: {
                                            name: name,
                                            value: o.value
                                        }
                                    });
                                    onClose();
                                }}>
                                    <ListItemAvatar>
                                        <Avatar  component="div" src={o.image} />
                                    </ListItemAvatar>
                                    <ListItemText primary={o.name}/>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
});
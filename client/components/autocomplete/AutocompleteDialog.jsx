import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, {useCallback, useMemo, useState} from "react";
import withMobileDialog from "@material-ui/core/withMobileDialog/withMobileDialog";
import {makeStyles} from "@material-ui/styles";
import TextField from "../TextField";

const useStyles = makeStyles({
    list: {
        overflowY: 'auto',
        height: 'calc(100% - 92px)'
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
});

export default withMobileDialog()(({fullScreen, label, options, open, onClose, title, onSelect, name}) => {
    const [ search, setSearch ] = useState('');
    const classes = useStyles();

    const selectItem = useCallback((item) => {
        if(item && item.value) {
            onSelect({
                target: {
                    name,
                    value: item.value
                }
            });
            onClose();
            setSearch("");
        }

    }, [name]);

    const filteredOptions = useMemo(() => {
        const limit = 25;
        const selectedOptions = options.filter(o => o.name.toLowerCase().startsWith(search.toLowerCase()));
        return selectedOptions.slice(0, limit);
    }, [options, search]);

    return(
        <Dialog fullScreen={fullScreen} open={open} fullWidth onClose={onClose} classes={{ paper: "nes-dialog" }} PaperComponent="dialog">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className={classes.listContainer}>
                <TextField
                    fullWidth
                    margin="normal"
                    onChange={e => setSearch(e.target.value)}
                    onKeyUp={e => {
                        if(e.keyCode === 13) {
                            selectItem(filteredOptions[0]);
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
                                <ListItem dense button key={o.value} onClick={() => {
                                    selectItem(o);
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
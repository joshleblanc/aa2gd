import React from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import SelectIcon from '@material-ui/icons/Add';
import {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const useStyles = makeStyles(theme => ({
    displayContainer: {
        display: 'flex'
    },
    list: {
        overflowY: 'auto',
        height: 'calc(100% - 68px)'
    },
    button: {
        padding: theme.spacing(3)
    }
}));

const filterOptions = (options, query) => {
    const limit = 25;
    const selectedOptions = options.filter(o => o.name.toLowerCase().startsWith(query.toLowerCase()));
    return selectedOptions.slice(0, limit);
};

const Autocomplete = ({label, options, fullScreen, placeholder, value, onChange, name, disabled}) => {
    const [ modalOpen, setModal ] = useState(false);
    const [ search, setSearch ] = useState('');
    const classes = useStyles();
    const selectedItem = options.find(o => o.value === value) || { name: '' };
    return(
        <React.Fragment>
            <div className={classes.displayContainer}>
                <TextField
                    fullWidth
                    label={label}
                    margin="normal"
                    value={selectedItem.name}
                    disabled
                />
                <IconButton onClick={() => setModal(true)} disabled={disabled} className={classes.button}>
                    <SelectIcon />
                </IconButton>
            </div>
            <Dialog fullScreen={fullScreen} open={modalOpen} fullWidth onClose={() => setModal(false)}>
                <DialogTitle>{placeholder}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label={label}
                        margin="normal"
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                    />
                    <Typography variant="caption">Type something to search</Typography>
                    <List className={classes.list}>
                        {
                            filterOptions(options, search).map(o => {
                                return(
                                    <ListItem dense button key={o.value} value={o.value} onClick={() => {
                                        console.log(o.value);
                                        onChange({
                                            target: {
                                                name: name,
                                                value: o.value
                                            }
                                        });
                                        setModal(false);
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
                    <Button onClick={() => setModal(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
};

export default withMobileDialog()(Autocomplete);
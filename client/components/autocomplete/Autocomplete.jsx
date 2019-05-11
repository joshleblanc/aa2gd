import React from 'react';
import TextField from "@material-ui/core/TextField/index";
import {makeStyles} from "@material-ui/styles/index";
import IconButton from "@material-ui/core/IconButton/index";
import SelectIcon from '@material-ui/icons/Add';
import {useState} from "react";
import Dialog from "@material-ui/core/Dialog/index";
import withMobileDialog from '@material-ui/core/withMobileDialog/index';
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import {Typography} from "@material-ui/core/index";
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import Avatar from "@material-ui/core/Avatar/index";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/index";
import AutocompleteDialog from "./AutocompleteDialog";

const useStyles = makeStyles({
    displayContainer: {
        display: 'flex'
    }
});

const Autocomplete = ({label, options, placeholder, value, onChange, name, disabled}) => {
    const [ modalOpen, setModal ] = useState(false);
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
            <AutocompleteDialog
                open={modalOpen}
                label={label}
                onClose={() => setModal(false)}
                title={placeholder}
                onSelect={onChange}
                options={options}
                name={name} />
        </React.Fragment>

    )
};

export default (Autocomplete);
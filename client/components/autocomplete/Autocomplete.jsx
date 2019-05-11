import React from 'react';
import TextField from "@material-ui/core/TextField/index";
import {makeStyles} from "@material-ui/styles/index";
import IconButton from "@material-ui/core/IconButton/index";
import SelectIcon from '@material-ui/icons/Add';
import {useState} from "react";
import AutocompleteDialog from "./AutocompleteDialog";

const useStyles = makeStyles({
    displayContainer: {
        display: 'flex'
    },
    button: {
        padding: theme.spacing(3)
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
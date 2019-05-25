import React from 'react';
import {makeStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton/index";
import SelectIcon from '@material-ui/icons/Add';
import {useState} from "react";
import AutocompleteDialog from "./AutocompleteDialog";
import Button from "../Button";
import classnames from 'classnames';
import Typography from "@material-ui/core/Typography";
import TextField from "../TextField";

const useStyles = makeStyles(theme => ({
    displayContainer: {
        display: 'flex'
    },
    button: {
        marginTop: 'auto'
    },
    flex: {
        display: 'flex'
    }
}));

const Autocomplete = ({label, options, placeholder, value, onChange, name, disabled, helperText, error}) => {
    const [modalOpen, setModal] = useState(false);
    const classes = useStyles();
    const selectedItem = options.find(o => o.value === value) || {name: ''};
    return (
      <React.Fragment>
          <TextField
            label={label}
            value={selectedItem.name}
            onClick={() => setModal(true)}
            disabled
            adornment={
                <Button disabled={disabled} className={classes.button}
                        variant="primary">
                    +
                </Button>
            }
          >
              <Typography variant="caption" color="error">{error && helperText}</Typography>
          </TextField>
          <AutocompleteDialog
            open={modalOpen}
            label={label}
            onClose={() => setModal(false)}
            title={placeholder}
            onSelect={onChange}
            options={options}
            name={name}/>
      </React.Fragment>

    )
};

export default (Autocomplete);
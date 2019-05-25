import React from 'react';
import {makeStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton/index";
import SelectIcon from '@material-ui/icons/Add';
import {useState} from "react";
import AutocompleteDialog from "./AutocompleteDialog";
import Button from "../Button";
import classnames from 'classnames';
import Typography from "@material-ui/core/Typography";

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
          <div className={classes.displayContainer}>
              <div className="nes-field" onClick={() => setModal(true)}>
                  <label>{label}</label>
                  <div className={classes.flex}>
                      <input type="text" className="nes-input" disabled value={selectedItem.name}/>
                      <Button onClick={() => setModal(true)} disabled={disabled} className={classes.button}
                              variant="primary">
                          +
                      </Button>
                  </div>
                  <Typography variant="caption" color="error">{error && helperText}</Typography>

              </div>
          </div>
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
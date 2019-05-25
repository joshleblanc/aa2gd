import React from "react";
import classnames from 'classnames';
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(1),
        display: 'flex'
    },
    children: {
        display: 'flex'
    }
}));

export default ({label, inline, variant, adornment, children, onClick, ...props}) => {
    const classes = useStyles();
    const containerClassNames = classnames({
        'nes-field': true,
        'is-inline': inline,
    });
    const inputClassNames = classnames({
        'nes-input': true,
        [`is-${variant}`]: !!variant
    });
    return(
      <div className={classes.container} onClick={onClick}>
          <div className={containerClassNames}>
              <label>{label}</label>
              <div className={classes.children}>
                  <input type='text' className={inputClassNames} {...props} />
                  {adornment}
              </div>
              {children}
          </div>
      </div>

    )
}
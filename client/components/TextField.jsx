import React from "react";
import classnames from 'classnames';
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(1),
        display: 'flex'
    },
    children: {
        display: 'flex'
    },
    fullWidth: {
        width: '100%'
    }
}));

const TextField = React.forwardRef(({label, inline, variant, adornment, children, onClick, fullWidth, helperText, error, ...props}, ref) => {
    const classes = useStyles();
    const containerClassNames = classnames({
        'nes-field': true,
        'is-inline': inline,
        [classes.fullWidth]: !!fullWidth
    });
    const inputClassNames = classnames({
        'nes-input': true,
        [`is-${variant}`]: !!variant
    });
    const helperTextColor = error ? 'error' : 'primary';
    return(
      <div className={classes.container} onClick={onClick}>
          <div className={containerClassNames}>
              <label>{label}</label>
              <div className={classes.children}>
                  <input type='text' ref={ref} className={inputClassNames} {...props} />
                  {adornment}
              </div>
              {
                  helperText &&
                  <Typography variant="caption" color={helperTextColor}>{helperText}</Typography>
              }

          </div>
      </div>

    )
});

export default TextField;
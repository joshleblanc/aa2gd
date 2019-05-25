import React from "react";
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Typography from "@material-ui/core/Typography";
import classnames from 'classnames';

const useStyles = makeStyles(({spacing}) => ({
    root: {
        padding: spacing(1.5),
        margin: spacing(2),
    },
    title: {
        display: 'table',
        padding: '0 0.5rem',
        margin: '-1.8rem 0 1rem',
        backgroundColor: "#303030"
    }
}), {withTheme: true});

export default ({children, title, className}) => {
    const classes = useStyles();
    const classNames = classnames({
        "nes-container": true,
        "with-title": !!title,
        [className]: !!className,
        [classes.root]: true
    });
    return (
      <div className={classNames}>
          <p className="title">
              {title}
          </p>
          {children}
      </div>
    )
};
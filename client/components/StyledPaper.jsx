import React from "react";
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Typography from "@material-ui/core/Typography";
import classnames from 'classnames';

const useStyles = makeStyles(({spacing}) => ({
    root: {
        padding: [spacing(1.5), '!important'],
        margin: [spacing(2), '!important'],
    },
    title: {
        display: 'table',
        padding: '0 0.5rem',
        margin: '-1.8rem 0 1rem',
        backgroundColor: "#303030"
    }
}), {withTheme: true});

export default ({children, title, className, rounded}) => {
    const classes = useStyles();
    const classNames = classnames({
        "nes-container": true,
        "with-title": !!title,
        [classes.root]: true,
        "is-rounded": true,
        [className]: !!className,
    });
    return (
      <div className={classNames}>
          {
              title &&
              <p className="title">
                  {title}
              </p>
          }

          {children}
      </div>
    )
};

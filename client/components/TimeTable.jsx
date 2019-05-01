import {CardContent, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    table: {
        width: '100%'
    }
});

const makeTimes = () => {
    const times = [];
    for(let i = 1; i < 24; i++) {
        times.push(`${i}:00`);
    }
    return times;
};

export default () => {
    const classes = useStyles();
    return(
        <React.Fragment>
            <Typography variant="h4">Times Available</Typography>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th />
                    <th>S</th>
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>T</th>
                    <th>F</th>
                    <th>S</th>
                </tr>
                </thead>
                <tbody>
                {
                    makeTimes().map(t => {
                        return(
                            <tr>
                                <td>{t}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </React.Fragment>
    )
}
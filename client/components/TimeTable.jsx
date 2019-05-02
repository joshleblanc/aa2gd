import {CardContent, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    table: {
        width: '100%',
        tableLayout: 'fixed'
    }
});

const makeTimes = () => {
    const times = [];
    for (let i = 1; i < 24; i++) {
        times.push(`${i}:00`);
    }
    return times;
};

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default () => {
    const [schedule, setSchedule] = useState(() => {
        const defaultSchedule = {};
        daysOfWeek.forEach(d => defaultSchedule[d] = []);
        return defaultSchedule;

    });
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography variant="h4">Times Available</Typography>
            <Typography variant="caption">Tap a square to edit</Typography>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th colSpan={2}/>
                    {daysOfWeek.map(d => <th>{d}</th>)}
                </tr>
                </thead>
                <tbody>
                {
                    makeTimes().map(t => {
                        return (
                            <tr>
                                <td colSpan="2">{t}</td>

                                {
                                    daysOfWeek.map(d => {
                                        return <td onClick={() => {
                                            setSchedule(prevSchedule => {
                                                if (prevSchedule[d].includes(t)) {
                                                    return {
                                                        ...prevSchedule,
                                                        [d]: prevSchedule[d].filter(s => s !== t)
                                                    };
                                                } else {
                                                    console.log("Excludes");
                                                    return {
                                                        ...prevSchedule,
                                                        [d]: [...prevSchedule[d], t]
                                                    };
                                                }
                                            })
                                        }} style={{backgroundColor: schedule[d].includes(t) ? 'green' : 'white'}}>

                                        </td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </React.Fragment>
    )
}
import {CardContent, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/styles";
import gql from "graphql-tag";
import {useMutation} from "react-apollo-hooks";

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

const UPDATE_TIMETABLE = gql`
    mutation UpdateTimetable($day: String, $time: String) {
        updateTimetable(day: $day, time: $time) {
            _id
            timeTable {
                Mo, Tu, We, Th, Fr, Sa, Su
            }
            
        }
    }
`;

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default ({editable, timeTable, _id}) => {
    const updateTimetable = useMutation(UPDATE_TIMETABLE);
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography variant="h4">Times Available</Typography>
            {
                editable && <Typography variant="caption">Tap a square to edit</Typography>
            }

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
                                            if(!editable) return;
                                            const newTimeTable = { ...timeTable };
                                            if(newTimeTable[d].includes(t)) {
                                                newTimeTable[d] = newTimeTable[d].filter(newT => t !== newT);
                                            } else {
                                                newTimeTable[d] = [...newTimeTable[d], t];
                                            }
                                            updateTimetable({
                                                variables: {
                                                    time: t,
                                                    day: d
                                                },
                                                optimisticResponse: {
                                                    __typename: "Mutation",
                                                    updateTimetable: {
                                                        _id: _id,
                                                        __typename: "User",
                                                        timeTable: {
                                                            __typename: "TimeTable",
                                                            ...newTimeTable
                                                        }
                                                    }
                                                }
                                            });
                                        }} style={{backgroundColor: timeTable[d].includes(t) ? 'green' : 'white'}}>

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
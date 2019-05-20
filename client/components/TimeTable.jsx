import {Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/styles";
import gql from "graphql-tag";
import {useMutation} from "react-apollo-hooks";
import TableHead from "@material-ui/core/TableHead";

const useStyles = makeStyles({
    table: {
        width: '100%',
        tableLayout: 'fixed'
    },
    cell: {
        border: '1px solid black'
    }
});

export const makeTimes = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
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

            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}/>
                        {daysOfWeek.map(d => <th key={d}>{d}</th>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        makeTimes().map(time => {
                            return (
                                <TableRow key={time}>
                                    <TableCell colSpan={2}>{time}</TableCell>
                                    {
                                        daysOfWeek.map(day => {
                                            return (
                                                <TableCell
                                                    onClick={() => {
                                                        if (!editable) return;
                                                        const newTimeTable = {...timeTable};
                                                        if (newTimeTable[day].includes(time)) {
                                                            newTimeTable[day] = newTimeTable[day].filter(newT => time !== newT);
                                                        } else {
                                                            newTimeTable[day] = [...newTimeTable[day], time];
                                                        }
                                                        updateTimetable({
                                                            variables: {
                                                                time: time,
                                                                day: day
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
                                                    }}
                                                    style={{backgroundColor: timeTable[day].includes(time) ? 'rgb(0, 100, 0)' : 'rgb(100,0,0)'}}
                                                    className={classes.cell}
                                                    key={day}
                                                >
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </React.Fragment>
    )
}
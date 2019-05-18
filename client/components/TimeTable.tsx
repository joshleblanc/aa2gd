import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import TimeTable, { TimesByDay } from "../types/TimeTable";

const useStyles = makeStyles({
    table: {
        width: '100%',
        tableLayout: 'fixed'
    }
});

export const makeTimes = () => {
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

const daysOfWeek: Array<keyof TimesByDay> = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface Props {
    editable?: boolean,
    timeTable: TimeTable,
    _id?: string
}

export default ({ editable, timeTable, _id }: Props) => {
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
                        <th colSpan={2} />
                        {daysOfWeek.map(d => <th>{d}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        makeTimes().map(time => {
                            return (
                                <tr>
                                    <td colSpan={2}>{time}</td>
                                    {
                                        daysOfWeek.map(day => {
                                            return <td onClick={() => {
                                                if (!editable) return;
                                                const newTimeTable: TimeTable = { ...timeTable };
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
                                            }} style={{ backgroundColor: timeTable[day].includes(time) ? 'green' : 'white' }}>
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
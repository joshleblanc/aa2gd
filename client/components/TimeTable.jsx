import {Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/styles";
import gql from "graphql-tag";
import {useMutation} from "react-apollo-hooks";
import TableHead from "@material-ui/core/TableHead";
import moment from 'moment';
import useOffset from "../hooks/useOffset";

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
    mutation UpdateTimetable($day: String!, $time: String!, $offset: Int!) {
        updateTimetable(day: $day, time: $time, offset: $offset) {
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
    const utcOffset = useOffset();
    return (
      <React.Fragment>
          {
              editable && <Typography variant="caption">Tap a square to edit</Typography>
          }
          <Table className={classes.table} size="small">
              <TableHead>
                  <TableRow>
                      <TableCell colSpan={2}/>
                      {daysOfWeek.map(d => <TableCell align="center" key={d}>{d}</TableCell>)}
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
                                        const momentTime = moment(time, "HH:mm");
                                        momentTime.set('day', day);
                                        momentTime.utcOffset(utcOffset);
                                        momentTime.parseZone();
                                        momentTime.local();
                                        const localDay = daysOfWeek[momentTime.day()];
                                        const localHour = momentTime.hour();
                                        const localTime = `${localHour}:00`;
                                        const color = timeTable[localDay].includes(localTime) ? 'rgb(0, 100, 0)' : 'rgb(100,0,0)';
                                        return (
                                          <TableCell
                                            align="center"
                                            onClick={() => {
                                                if (!editable) return;
                                                console.log(localDay, localTime);

                                                const newTimeTable = {...timeTable};
                                                if (newTimeTable[localDay].includes(localTime)) {
                                                    newTimeTable[localDay] = newTimeTable[localDay].filter(newT => localTime !== newT);
                                                } else {
                                                    newTimeTable[localDay] = [...newTimeTable[localDay], localTime];
                                                }
                                                updateTimetable({
                                                    variables: {
                                                        time: time,
                                                        day: day,
                                                        offset: utcOffset
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
                                                    },
                                                });
                                            }}
                                            style={{backgroundColor: color }}
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

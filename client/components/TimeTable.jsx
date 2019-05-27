import {Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/styles";
import gql from "graphql-tag";
import {useMutation} from "react-apollo-hooks";
import TableHead from "@material-ui/core/TableHead";
import {GET_CURRENT_USER} from "../hooks/useCurrentUser";
import useToken from "../hooks/useToken";

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
    const token = useToken();
    const classes = useStyles();
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
                                        return (
                                          <TableCell
                                            align="center"
                                            onClick={() => {
                                                if (!editable) return;
                                                const newTimeTable = {...timeTable};
                                                if (newTimeTable[day].includes(time)) {
                                                    newTimeTable[day] = newTimeTable[day].filter(newT => time !== newT);
                                                } else {
                                                    newTimeTable[day] = [...newTimeTable[day], time];
                                                }
                                                console.log(newTimeTable);
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
                                                    },
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

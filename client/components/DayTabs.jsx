import * as React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import {makeTimes} from "./TimeTable";
import {makeStyles} from "@material-ui/styles";
import gql from "graphql-tag";
import {useQuery} from "react-apollo-hooks";
import moment from 'moment';
import useOffset from '../hooks/useOffset';

const days = [
    "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa",
];

const useStyles = makeStyles({
    table: {
        width: '100%',
        tableLayout: 'fixed'
    },
    cell: {
        border: '1px solid black'
    }
});

const GET_AVAILABLE_TIMETABLE = gql`
    query AvailableTimeTable($id: ID!) {
        availableTimeTable(id: $id)
    }
`;

export default ({id, max}) => {
    const times = makeTimes();
    const classes = useStyles();
    const {data, loading, error} = useQuery(GET_AVAILABLE_TIMETABLE, {
        variables: {id}
    });
    const utcOffset = useOffset();
    if (loading || error) {
        return <Typography>Loading...</Typography>;
    }
    const timeTable = JSON.parse(data.availableTimeTable);
    return (
        <React.Fragment>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}/>
                        {
                            days.map(d => (
                                <TableCell align="center" key={d}>
                                    {d}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        times.map(time => {
                            return (
                                <TableRow hover key={time}>
                                    <TableCell colSpan={2}>{time}</TableCell>
                                    {
                                        days.map(day => {
                                            const momentTime = moment(time, "HH:mm");
                                            momentTime.utcOffset(utcOffset);
                                            momentTime.set('day', day);
                                            momentTime.set('hour', time.split(':')[0]);
                                            momentTime.utc();
                                            const localDay = moment.weekdaysMin()[momentTime.day()];
                                            const localHour = momentTime.hour();
                                            const localTime = `${localHour}:00`;
                                            const count = timeTable[localTime][localDay];
                                            let color;
                                            if (count === 0) {
                                                color = `rgb(100, 0, 0)`;
                                            } else {
                                                color = `rgb(0, ${(max / count) * 100}, 0)`;
                                            }
                                            return (
                                                <TableCell key={day} align="center" style={{backgroundColor: color}}
                                                           className={classes.cell}>
                                                    {count}
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
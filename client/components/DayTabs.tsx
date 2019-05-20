import * as React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import {makeTimes} from "./TimeTable";
import {makeStyles} from "@material-ui/styles";
import gql from "graphql-tag";
import {useQuery} from "react-apollo-hooks";

interface Props {
    id: string,
    max: number
}

const days = [
    "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa",
];

const useStyles = makeStyles({
    table: {
        width: '100%',
        tableLayout: 'fixed'
    }
});

const GET_AVAILABLE_TIMETABLE = gql`    
    query AvailableTimeTable($id: ID!) {
        availableTimeTable(id: $id)
    }
`;

export default ({id, max}: Props) => {
    const times = makeTimes();
    const classes = useStyles();
    const { data, loading, error } = useQuery(GET_AVAILABLE_TIMETABLE, {
        variables: { id }
    });
    if(loading || error) {
        return <Typography>Loading...</Typography>;
    }
    console.log(data);
    const timeTable = JSON.parse(data.availableTimeTable);
    return (
        <React.Fragment>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} />
                        {
                            days.map((d:string) => (
                                <TableCell align="center">
                                    {d}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        times.map((time:string) => {
                            return(
                                <TableRow hover>
                                    <TableCell colSpan={2}>{time}</TableCell>
                                    {
                                        days.map((day:string) => {
                                            console.log(day);
                                            const count = timeTable[time][day];
                                            let color;
                                            if(count === 0) {
                                                color = `rgb(100,0,0)`;
                                            } else {
                                                color = `rgb(0, ${(max / count) * 100}, 0)`;
                                            }
                                            return(
                                                <TableCell align="center" style={{backgroundColor: color}}>
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
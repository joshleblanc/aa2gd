import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import User from "../types/User";
import {makeTimes} from "./TimeTable";
import {makeStyles} from "@material-ui/styles";

interface Props {
    users: Array<User>
}

const days = [
    "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"
];

const useStyles = makeStyles({
    table: {
        width: '100%',
        tableLayout: 'fixed'
    }
});

export default ({users}: Props) => {
    const times = makeTimes();
    const classes = useStyles();
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
                                            const count = users.reduce((total:number, user:User) => {
                                                return user.timeTable[day].includes(time) ? total + 1 : total;
                                            }, 0);
                                            return(
                                                <TableCell align="center">
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
import * as React from "react";
import {Tab, Tabs} from "@material-ui/core";
import {useState} from "react";
import User from "../types/User";
import {makeTimes} from "./TimeTable";

interface Props {
    users: Array<User>
}

const days = [
    "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"
];

export default ({users}: Props) => {
    const [value, setValue] = useState(0);
    const day = days[value];
    console.log(users);
    const times = makeTimes();
    const timeCounts: { [unit: string]: number} = {};
    times.forEach((t:string) => timeCounts[t] = 0);
    users.forEach((u:User) => {
        (u.timeTable[day] as Array<string>).forEach((t:string) => {
            timeCounts[t] += 1;
        })
    });
    console.log(timeCounts);
    return (
        <React.Fragment>
            <Tabs variant="scrollable" value={value}
                  scrollButtons="auto"
                  onChange={(_e, v) => setValue(v)}>
                <Tab label={"Monday"}/>
                <Tab label={"Tuesday"}/>
                <Tab label={"Wednesday"}/>
                <Tab label={"Thursday"}/>
                <Tab label={"Friday"}/>
                <Tab label={"Saturday"}/>
                <Tab label={"Sunday"}/>
            </Tabs>
        </React.Fragment>
    )
}
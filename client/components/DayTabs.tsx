import * as React from "react";
import {Tab, Tabs} from "@material-ui/core";
import {useState} from "react";
import User from "../types/User";

interface Props {
    users: Array<User>
}

export default ({users}: Props) => {
    const [value, setValue] = useState(0);
    console.log(users);
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
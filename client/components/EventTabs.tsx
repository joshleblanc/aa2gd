import * as React from 'react';
import Event from '../types/Event';
import { Tabs, Tab } from '@material-ui/core';
import { useState } from 'react';
import EventList from './EventList';
import moment from 'moment';

interface Props {
    events: Array<Event>
}

export default ({ events }: Props) => {
    const [value, setValue] = useState(0);
    const futureEvents:Array<Event> = [];
    const pastEvents:Array<Event> = [];
    const currentEvents:Array<Event> = [];
    const currentDate = moment();
    events.forEach(s => {
        const date = moment(parseInt(s.date));
        if(date.diff(currentDate, 'hours') < -3 && pastEvents.length < 10) {
            pastEvents.push(s);
        } else if(date.isAfter(currentDate)) {
            futureEvents.push(s);
        } else {
            currentEvents.push(s);
        }
    });
    return(
        <React.Fragment>
            <Tabs
                value={value}
                onChange={(_e,v) => setValue(v)}
            >
                <Tab label="Current" />
                <Tab label="Upcoming" />
                <Tab label="Past" />
            </Tabs>
            { value === 0 && <EventList events={currentEvents} />}
            { value === 1 && <EventList events={futureEvents} />}
            { value === 2 && <EventList events={pastEvents} />}
        </React.Fragment>
        
    )
}
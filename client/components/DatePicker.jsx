import Picker from 'pickerjs';
import TextField from "./TextField";
import React from "react";
import moment from "moment";
const ref = React.createRef();
export default ({onChange, ...props}) => {

    if(ref.current) {
        const picker = new Picker(ref.current, {
            format: 'YYYY-MM-DD HH:mm',
            headers: true,
            pick: () => onChange(moment(picker.getDate())),
            increment: {
                year: 1,
                month: 1,
                day: 1,
                hour: 1,
                minute: 15,
            }
        });
    }
    return (
      <TextField
        ref={ref}
        onChange={onChange}
        {...props}
      />
    )
}

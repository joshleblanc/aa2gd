import Picker from 'pickerjs';
import TextField from "./TextField";
import React from "react";
const ref = React.createRef();
export default (props) => {

    if(ref.current) {
        new Picker(ref.current, {
            format: 'YYYY-MM-DD HH:mm',
            headers: true,
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
        {...props}
      />
    )
}
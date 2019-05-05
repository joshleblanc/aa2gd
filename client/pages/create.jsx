import React from "react";
import {Field, Form, Formik} from "formik";
import { TextField } from 'formik-material-ui';
import StyledPaper from "../components/StyledPaper";
import Typography from "@material-ui/core/Typography";
import useCurrentUser from "../hooks/useCurrentUser";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Autocomplete from "../components/Autocomplete";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {DateTimePicker} from "@material-ui/pickers/DateTimePicker/DateTimePicker";

const initialValues = {
    name: '',
    server: '',
    game: ''
};

export default () => {
    const { data, error, loading } = useCurrentUser();
    if(error) return "Error";
    if(loading) return "Loading...";
    console.log(data.currentUser);
    return(
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <StyledPaper>
                <Formik initialValues={initialValues} onSubmit={(props, values) => {
                    console.log(props, values);
                }}>
                    <Form>
                        <Typography variant={"h5"}>Create a new event!</Typography>
                        <Field
                            label={"Name"}
                            fullWidth
                            name={'name'}
                            component={TextField}
                        />
                        <Field
                            name={'server'}
                            render={({field, form}) => {
                                return(
                                    <Autocomplete
                                        {...field}
                                        options={data.currentUser.servers.map(s => ({ value: s._id, name: s.name, image: s.iconUrl }))}
                                        label="Server"
                                        placeholder="Select a server"
                                        disabled={form.isSubmitting}
                                    />
                                )
                            }}
                        />
                        <Field
                            name="game"
                            render={({field, form}) => {
                                return(
                                    <Autocomplete
                                        {...field}
                                        options={data.currentUser.games.map(g => ({ value: g._id, name: g.name, image: g.iconUrl }))}
                                        label="Game"
                                        placeholder="Select a game"
                                        disabled={form.isSubmitting}
                                    />
                                )
                            }}
                        />
                        <Field
                            name={'date'}
                            render={({field, form}) => {
                                return(
                                    <DateTimePicker
                                        label={"Date and Time"}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                )
                            }}
                        />
                        <Button type="submit">Submit</Button>
                    </Form>
                </Formik>
            </StyledPaper>
        </MuiPickersUtilsProvider>
    )
}
import React from "react";
import {Field, Form, Formik} from "formik";
import { TextField } from 'formik-material-ui';
import StyledPaper from "../components/StyledPaper";
import Typography from "@material-ui/core/Typography";
import useCurrentUser from "../hooks/useCurrentUser";
import MenuItem from "@material-ui/core/MenuItem";

const initialValues = {
    name: '',
    server: '',
    game: ''
};

export default () => {
    const { data, error, loading } = useCurrentUser();
    if(error) return "Error";
    if(loading) return "Loading...";

    return(
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
                        label={"Server"}
                        fullWidth
                        select
                        name={'server'}
                        component={TextField}
                    >
                        {
                            data.currentUser.servers.map(s => {
                                return(
                                    <MenuItem value={s._id} key={s._id}>
                                        {s.name}
                                    </MenuItem>
                                )
                            })
                        }
                    </Field>
                    <Field
                        label="Game"
                        fullWidth
                        select
                        name={'game'}
                        component={TextField}
                    >
                    </Field>
                </Form>
            </Formik>
        </StyledPaper>
    )
}
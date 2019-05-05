import React from "react";
import {Field, Form, Formik} from "formik";
import { TextField } from 'formik-material-ui';
import StyledPaper from "../components/StyledPaper";
import Typography from "@material-ui/core/Typography";
import useCurrentUser from "../hooks/useCurrentUser";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Autocomplete from "../components/Autocomplete";

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
                        render={({field}) => {
                            return(
                                <Autocomplete
                                    {...field}
                                    options={data.currentUser.servers.map(s => ({ value: s._id, name: s.name, image: s.iconUrl }))}
                                    label="Server"
                                    placeholder="Select a server"
                                />
                            )
                        }}
                    />
                    <Field
                        name="game"
                        render={({field}) => {
                            return(
                                <Autocomplete
                                    {...field}
                                    options={data.currentUser.games.map(g => ({ value: g._id, name: g.name, image: g.iconUrl }))}
                                    label="Game"
                                    placeholder="Select a game"
                                />
                            )
                        }}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
            </Formik>
        </StyledPaper>
    )
}
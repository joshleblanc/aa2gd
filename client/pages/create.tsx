import React, {useState} from "react";
import { Field, Form, Formik, FieldProps } from "formik";
import { TextField } from 'formik-material-ui';
import StyledPaper from "../components/StyledPaper";
import Typography from "@material-ui/core/Typography";
import useCurrentUser, { GET_CURRENT_USER } from "../hooks/useCurrentUser";
import Button from "@material-ui/core/Button";
import Autocomplete from "../components/autocomplete/Autocomplete";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from "@material-ui/pickers";
import gql from 'graphql-tag';
import {useMutation, useQuery} from "react-apollo-hooks";
import Game from "../types/Game";
import Server from "../types/Server";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import useToken from "../hooks/useToken";
import {useSnackbar} from "notistack";
import {FormControl, FormHelperText} from "@material-ui/core";
import moment from 'moment';

const initialValues = {
    name: '',
    server: '',
    game: '',
    date: new Date()
};

const CREATE_EVENT = gql`    
    mutation CreateEvent($name: String!, $server: ID!, $game: ID!, $date: String!) {
        createEvent(name: $name, server: $server, game: $game, date: $date) {
            _id
        }
    }
`;

const GET_AVAILABLE_USERS = gql`    
    query GetAvailableUsers($id: ID!, $date: String!) {
        availableUsers(date: $date, id: $id)
    }
`;

interface FormValues {
    name: string,
    server: string,
    game: string,
    date: Date
}

export default () => {
    const { data, error, loading } = useCurrentUser();
    const [ serverId, setServerId] = useState("");
    const [ date, setDate ] = useState(moment().format());
    const availableUsersQuery = useQuery(GET_AVAILABLE_USERS, {
        variables: {
            id: serverId,
            date: date
        }
    });
    console.log(availableUsersQuery);
    const { enqueueSnackbar } = useSnackbar();
    const createEvent = useMutation(CREATE_EVENT);
    const token = useToken();
    if (error) return "Error";
    if (loading) return "Loading...";
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <StyledPaper>
                <Formik initialValues={initialValues} onSubmit={async (fields, form) => {
                    form.setSubmitting(true);
                    await createEvent({
                        variables: {
                            ...fields
                        },
                        refetchQueries: [{ query: GET_CURRENT_USER, variables: { token  } }]
                    });
                    enqueueSnackbar("Event created!", { variant: "success" });
                    form.setSubmitting(false);
                }}>
                    <Form>
                        <Typography variant={"h5"}>Create a new event!</Typography>
                        <Field
                            label={"Name"}
                            fullWidth
                            name={'name'}
                            margin="normal"
                            component={TextField}
                        />
                        <Field
                            name={'server'}
                            render={({ field, form }: FieldProps<FormValues>) => {
                                return (
                                    <Autocomplete
                                        {...field}
                                        onChange={(e:{target: { value:string }})=> {
                                            setServerId(e.target.value);
                                            console.log(e.target.value);
                                            field.onChange(e);
                                        }}
                                        options={data.currentUser.servers.map((s: Server) => ({ value: s._id, name: s.name, image: s.iconUrl }))}
                                        label="Server"
                                        placeholder="Select a server"
                                        disabled={form.isSubmitting}
                                    />
                                )
                            }}
                        />
                        <Field
                            name="game"
                            render={({ field, form }: FieldProps<FormValues>) => {
                                return (
                                    <Autocomplete
                                        {...field}
                                        options={data.currentUser.games.map((g: Game) => ({ value: g._id, name: g.name, image: g.iconUrl }))}
                                        label="Game"
                                        placeholder="Select a game"
                                        disabled={form.isSubmitting}
                                    />
                                )
                            }}
                        />
                        <Field
                            name={'date'}
                            render={({ field }: FieldProps<FormValues>) => {
                                const onChange = (e: MaterialUiPickersDate) => {
                                    field.onChange({ target: { value: e, name: 'date' } });
                                    setDate(e!.format());
                                };
                                return (
                                    <FormControl>
                                        <DateTimePicker
                                            label={"Date and Time"}
                                            onChange={onChange}
                                            value={field.value}
                                            name="date"
                                            fullWidth
                                            margin="normal"
                                        />
                                        <FormHelperText>
                                            {
                                                availableUsersQuery.data.availableUsers &&
                                                    availableUsersQuery.data.availableUsers.length > 0 &&
                                                        `${availableUsersQuery.data.availableUsers} users are available at this time`
                                            }
                                        </FormHelperText>
                                    </FormControl>
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
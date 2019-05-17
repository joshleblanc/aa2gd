import React from "react";
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
import { useMutation } from "react-apollo-hooks";
import Game from "../types/Game";
import Server from "../types/Server";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import uuid from 'uuid/v1';
import User from '../types/User';
import Event from '../types/Event';
import useToken from "../hooks/useToken";

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

interface FormValues {
    name: string,
    server: string,
    game: string,
    date: Date
}

export default () => {
    const { data, error, loading } = useCurrentUser();
    const createEvent = useMutation(CREATE_EVENT);
    const token = useToken();
    if (error) return "Error";
    if (loading) return "Loading...";
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <StyledPaper>
                <Formik initialValues={initialValues} onSubmit={(fields, form) => {
                    createEvent({
                        variables: {
                            ...fields
                        },
                        optimisticResponse: {
                            __typename: "Mutation",
                            createEvent: {
                                __typename: "Event",
                                _id: uuid(),
                                ...fields
                            }
                        },
                        update: (proxy) => {
                            const proxyData: { currentUser: User } | null = proxy.readQuery({ query: GET_CURRENT_USER, variables: { token } });
                            console.log(proxyData);
                            const server = proxyData!.currentUser.servers.find((s:Server) => s._id === fields.server);
                            const game = proxyData!.currentUser.games.find((g:Game) => g._id === fields.game);
                            if(game && server) {
                                const tmpEvent = {
                                    _id: uuid(),
                                    ...fields,
                                    server: server,
                                    game: game,
                                    date: fields.date.toString()
                                }
                                game.events.push(tmpEvent as Event);
                                server.events.push(tmpEvent as Event);
                            }
                            proxy.writeQuery({ query: GET_CURRENT_USER, data: proxyData });
                            
                        },
                        refetchQueries: [{ query: GET_CURRENT_USER }]
                    });
                    console.log(fields, form);
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
                                };
                                return (
                                    <DateTimePicker
                                        label={"Date and Time"}
                                        onChange={onChange}
                                        value={field.value}
                                        name="date"
                                        fullWidth
                                        margin="normal"
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
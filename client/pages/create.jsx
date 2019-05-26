import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import StyledPaper from "../components/StyledPaper";
import useCurrentUser, {GET_CURRENT_USER} from "../hooks/useCurrentUser";
import Autocomplete from "../components/autocomplete/Autocomplete";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import gql from 'graphql-tag';
import {useMutation, useQuery} from "react-apollo-hooks";
import useToken from "../hooks/useToken";
import {useSnackbar} from "notistack";
import {FormControl, FormHelperText} from "@material-ui/core";
import moment from 'moment';
import * as Yup from 'yup';
import {makeStyles} from "@material-ui/styles";
import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import Button from "../components/Button";

const useStyles = makeStyles(theme => ({
    submitButton: {
        marginTop: theme.spacing(2)
    },
    container: {
        maxWidth: '496px',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));

const initialValues = {
    name: '',
    server: '',
    game: '',
    date: moment().format('YYYY-MM-DD HH:00')
};

const validation = Yup.object().shape({
    name: Yup.string().required(),
    server: Yup.string().required(),
    game: Yup.string().required(),
    date: Yup.string().required()
});

const CREATE_EVENT = gql`
    mutation CreateEvent($name: String!, $server: ID!, $game: ID!, $date: String!) {
        createEvent(name: $name, server: $server, game: $game, date: $date) {
            _id
        }
    }
`;

const GET_AVAILABLE_USERS = gql`
    query GetAvailableUsers($serverId: ID!, $gameId: ID!, $date: String!) {
        availableUsers(date: $date, serverId: $serverId, gameId: $gameId)
    }
`;
export default () => {
    const {data, error, loading} = useCurrentUser();
    const [serverId, setServerId] = useState("");
    const [gameId, setGameId] = useState("");
    const [date, setDate] = useState(moment());
    const availableUsersQuery = useQuery(GET_AVAILABLE_USERS, {
        variables: {
            serverId,
            gameId,
            date: date.format()
        }
    });
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const createEvent = useMutation(CREATE_EVENT);
    const token = useToken();
    if (error) return "Error";
    if (loading) return "Loading...";
    return (
        <div className={classes.container}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <StyledPaper title="Create a new event!" className={classes.paper}>
                    <Formik initialValues={initialValues}
                            validationSchema={validation}
                            onSubmit={async (fields, form) => {
                                form.setSubmitting(true);
                                await createEvent({
                                    variables: {
                                        ...fields
                                    },
                                    refetchQueries: [{query: GET_CURRENT_USER, variables: {token}}]
                                });
                                enqueueSnackbar("Event created!", {variant: "success"});
                                form.setSubmitting(false);
                            }}
                            render={({submitForm, isSubmitting, values, setFieldValue, isValid}) => (
                                <Form>
                                    <Field
                                        name={'name'}
                                        render={({field, form}) => {
                                            return (
                                                <TextField
                                                    {...field}
                                                    autoComplete="off"
                                                    fullWidth
                                                    helperText={form.touched.name && form.errors.name}
                                                    error={form.touched.name && form.errors.name}
                                                    disabled={form.isSubmitting}
                                                    label={"Name"}
                                                />
                                            )
                                        }}
                                    />
                                    <Field
                                        name={'server'}
                                        render={({field, form}) => {
                                            return (
                                                <Autocomplete
                                                    {...field}
                                                    fullWidth
                                                    onChange={e => {
                                                        setServerId(e.target.value);
                                                        field.onChange(e);
                                                    }}
                                                    options={data.currentUser.servers.map(s => ({
                                                        value: s._id,
                                                        name: s.name,
                                                        image: s.iconUrl
                                                    }))}
                                                    helperText={form.touched.server && form.errors.server}
                                                    error={form.touched.server && form.errors.server}
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
                                            return (
                                                <Autocomplete
                                                    {...field}
                                                    fullWidth
                                                    onChange={e => {
                                                        field.onChange(e);
                                                        setGameId(e.target.value);
                                                    }}
                                                    options={data.currentUser.games.map(g => ({
                                                        value: g._id,
                                                        name: g.name,
                                                        image: g.iconUrl
                                                    }))}
                                                    helperText={form.touched.game && form.errors.game}
                                                    error={form.touched.game && form.errors.game}
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
                                            const onChange = e => {
                                                field.onChange({target: {value: e, name: 'date'}});
                                                if (date.hour() !== e.hour()) {
                                                    setDate(e);
                                                }
                                            };
                                            return (
                                                <FormControl fullWidth>
                                                    <DatePicker
                                                        label={"Date and Time"}
                                                        onChange={onChange}
                                                        value={field.value}
                                                        name="date"
                                                        fullWidth
                                                        margin="normal"
                                                        helperText={form.errors.date}
                                                        error={!!form.errors.date}
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
                                    <Button
                                        variant='primary'
                                        disabled={isSubmitting || !isValid}
                                        className={classes.submitButton}
                                        onClick={submitForm}
                                    >Submit</Button>
                                </Form>
                            )}
                    />
                </StyledPaper>
            </MuiPickersUtilsProvider>
        </div>

    )
}

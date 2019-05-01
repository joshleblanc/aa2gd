import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import useCurrentUser from '../hooks/useCurrentUser';
import gql from 'graphql-tag';
import {useMutation, useQuery} from 'react-apollo-hooks';
import ServerList from '../components/ServerList'
import ConnectionList from '../components/ConnectionList';

const useStyles = makeStyles(theme => ({
    media: {
        height: 100
    },
    avatar: {
        height: 100,
        width: 100,
        marginLeft: theme.spacing(12),
        marginRight: theme.spacing(12),
        marginTop: -theme.spacing(8),
        borderRadius: 50
    },
    headerContent: {
        marginTop: -theme.spacing(14),
        marginLeft: theme.spacing(16),
        padding: theme.spacing(1)
    },
    table: {
        width: '100%'
    }
}));

const GET_USER = gql`
    query User($id: ID!) {
        user(id: $id) {
            _id
            id
            username
            connections {
                _id
                id
                name
                type
            }
            avatar
            avatarUrl
        }
    }
`;

export default ({router}) => {
    const classes = useStyles();
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { id: router.query.id }
    });
    if(loading) return "Loading...";
    if(error) return "Error";
    return(
        <Card>
            <CardMedia
                component="img"
                className={classes.media}
                image="https://picsum.photos/1920/1080"
            />
            <CardMedia
                className={classes.avatar}
                component="img"
                image={data.user.avatarUrl}
            />
            <CardContent>
                <ConnectionList connections={data.user.connections} />
                <Typography variant="h4">Times Available</Typography>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        <th />
                        <th>S</th>
                        <th>M</th>
                        <th>T</th>
                        <th>W</th>
                        <th>T</th>
                        <th>F</th>
                        <th>S</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>12:00</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}
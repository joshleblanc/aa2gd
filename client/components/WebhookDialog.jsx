import Dialog from "./Dialog";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import useWebhooks, { GET_WEBHOOKS } from "../hooks/useWebhooks";
import { Typography, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import Button from "./Button";
import TextField from "./TextField";
import { Formik, Form, Field } from "formik";
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import uuid from 'uuid/v1';
import FixedHeightList from "./FixedHeightList";
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  webhookList: {
    marginTop: theme.spacing(2)
  },
  webhookListItem: {
    width: 'inherit',
    padding: '1em',
  },
  webhookDeleteIcon: {
    marginLeft: 'auto',
    padding: 0,
    fontSize: 36,
    "-webkit-font-smoothing": "none",
  }
}));


const DELETE_WEBHOOK = gql`
  mutation DeleteWebhook($id: ID!) {
    deleteWebhook(id: $id) {
      _id
    }
  } 
`;

const Content = ({userId, serverId}) => {
  const { data, error, loading } = useWebhooks(userId, serverId);
  const deleteWebhook = useMutation(DELETE_WEBHOOK);
  const classes = useStyles();
  if(error || loading) return "Loading...";
  console.log(data);
  if (data.webhooks.length === 0) {
    return <Typography gutterBottom>No webhooks registered</Typography>;
  } else {
      return(
        <div className={classes.webhookList}>
          <Typography variant="h5">Registered Webhooks</Typography>
          <FixedHeightList height={350}>
          {
            data.webhooks.map(w => {
              return(
                <ListItem className={classnames(classes.webhookListItem, "nes-container", "is-rounded")}>
                  <ListItemText primary={w.name} secondary={w.url} />
                  <Button variant="error" onClick={() => {
                    deleteWebhook({ 
                      variables: { id: w._id },
                      optimisticResponse: {
                        __typename: "Mutation",
                        deleteWebhook: {
                          __typename: "Webhook",
                          _id: w._id
                        }
                      },
                      update: (proxy, { data: { deleteWebhook }}) => {
                        const data = proxy.readQuery({ query: GET_WEBHOOKS, variables: { userId, serverId }});
                        console.log(data);
                        proxy.writeQuery({ 
                          query: GET_WEBHOOKS, 
                          variables: { userId, serverId }, 
                          data: {
                            webhooks: data.webhooks.filter(webhook => webhook._id !== deleteWebhook._id)
                          },
                        })
                      }
                    })
                  }}>Delete</Button>
                </ListItem>
              )
            })
          }
        </FixedHeightList>
        </div>
        
      );
  }
};

const CREATE_WEBHOOK = gql`
    mutation CreateWebhook($name: String!, $url: String!, $creator: ID!, $server: ID!) {
        createWebhook(name: $name, url: $url, creator: $creator, server: $server) {
            _id
            name
            url
            server {
                _id
            }
            creator {
                _id
            }
        }
    }
`;

const initialValues = {
    name: "",
    url: ""
}

export default ({ open, onClose, userId, serverId }) => {
  const createWebhook = useMutation(CREATE_WEBHOOK);
  const handleSubmit = async (fields, form) => {
      console.log("Submitting");
      form.setSubmitting(true);
      await createWebhook({
          variables: {
              ...fields,
              creator: userId,
              server: serverId
          },
          optimisticResponse: {
            __typename: "Mutation",
            createWebhook: {
              _id: uuid(),
              __typename: "Webhook",
              ...fields,
              creator: {
                __typename: "User",
                _id: userId
              },
              server: {
                __typename: "Server",
                _id: serverId
              }
            }
          }
      })
      form.setSubmitting(false);
  }
  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle disableTypography>
          <Typography variant="h5">Webhooks</Typography>
          <Typography variant="caption" gutterBottom>
            You can register webhooks here to get notifications of events in
            your server.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={form => (
              <Form>
                <Field
                  name="name"
                  render={({ field, form }) => {
                    return (
                      <TextField
                        {...field}
                        fullWidth
                        helperText={form.touched.name && form.errors.name}
                        error={form.touched.name && form.errors.name}
                        disabled={form.isSubmitting}
                        label="Name"
                      />
                    );
                  }}
                />
                <Field 
                    name="url"
                    render={({field, form}) => {
                        return(
                            <TextField 
                                {...field}
                                fullWidth
                                helperText={form.touched.url && form.errors.url}
                                error={form.touched.url && form.errors.url}
                                disabled={form.isSubmitting}
                                label="Webhook URL"       
                            />
                        )
                    }}
                />
                <Button type="submit">Add webhook</Button>
              </Form>
            )}
          />
          <Content userId={userId} serverId={serverId} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

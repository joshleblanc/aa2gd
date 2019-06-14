import Dialog from "./Dialog";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import useWebhooks from "../hooks/useWebhooks";
import { Typography } from "@material-ui/core";
import Button from "./Button";
import TextField from "./TextField";
import { Formik, Form, Field } from "formik";
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

const Content = ({userId, serverId}) => {
  const { data, error, loading } = useWebhooks(userId, serverId);
  if(error || loading) return "Loading...";
  console.log(data);
  if (data.webhooks.length === 0) {
    return <Typography gutterBottom>No webhooks registered</Typography>;
  } else {
      return null;
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

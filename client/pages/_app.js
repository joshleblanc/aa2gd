import React from 'react';
import App, { Container } from 'next/app';
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import Navbar from '../components/Navbar';
import nextCookie from "next-cookies";
import Head from 'next/head'
import initApollo from '../lib/initApolloClient';
import { ApolloProvider, getMarkupFromTree } from 'react-apollo-hooks';
import { renderToString } from 'react-dom/server';
import theme from '../lib/theme';
import { ThemeProvider } from "@material-ui/styles";
import Drawer from '../components/drawer/Drawer';
import DrawerToolbar from '../components/drawer/DrawerToolbar';
import Main from '../components/Main';
import 'react-virtualized-select/styles.css';
import 'nes.css/css/nes.css';

export default class extends App {

  constructor(props) {
    super(props);
    this.apolloClient = initApollo(props.apolloState, props.host);
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static async getInitialProps({ Component, classes, ...pageProps }) {
    let apolloHost, host;
    if(process.env.NODE_ENV === 'development') {
      apolloHost = "http://localhost:4000";
      host = "http://localhost:3000";
    } else {
      if(process.browser) {
        host = `https://${window.location.hostname}`;
        apolloHost = host;
      } else {
        host = `https://${pageProps.ctx.req.headers.host}`;
        apolloHost = host;
      }
    }

    const { token } = nextCookie(pageProps.ctx);

    const apollo = initApollo(null, apolloHost);
    apollo.cache.writeData({
      data: {
        token: token || null,
        drawerOpen: false,
        host
      }
    });
    
    // Run all GraphQL queries in the component tree
    // and extract the resulting data
    if (!process.browser) {
      try {
        // Run all GraphQL queries
        await getMarkupFromTree({
          renderFunction: renderToString,
          tree: <Container>
            <ThemeProvider theme={theme}>
              <SnackbarProvider>
                <ApolloProvider client={apollo}>
                  <div style={{display: 'flex'}}>
                    <CssBaseline />
                    <Navbar />
                    <Drawer /> 
                    <Main>
                      <DrawerToolbar />
                      <Component {...pageProps} />
                    </Main>
                  </div>
                </ApolloProvider>
              </SnackbarProvider>
            </ThemeProvider>
          </Container>
        })
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error)
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind();
    }
    const apolloState = apollo.cache.extract();
    return {
      apolloState: apolloState,
      host: apolloHost
    }
  }

  render() {
    const { Component, ...pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <ApolloProvider client={this.apolloClient}>
              <div style={{display: 'flex'}}>
                <CssBaseline />
                <Navbar />
                <Drawer /> 
                <Main>
                  <DrawerToolbar />
                  <Component {...pageProps} />
                </Main>
              </div>
            </ApolloProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Container>
    )
  }
}

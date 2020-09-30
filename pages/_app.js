import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/client';
import withApollo from '../lib/withApollo';
import Layout from '../components/layout/Layout';
import '../styles/tailwind.css';
import '../styles/index.css';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);

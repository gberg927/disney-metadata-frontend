import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { getDataFromTree } from '@apollo/react-ssr';
import initApollo from './initApollo';

const withApollo = App =>
  class Apollo extends React.Component {
    static displayName = 'withApollo(App)';

    static async getInitialProps(ctx) {
      const { AppTree } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      const apollo = initApollo();
      if (typeof window === 'undefined') {
        try {
          await getDataFromTree(
            <AppTree {...appProps} apolloClient={apollo} />
          );
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }
        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    static propTypes = {
      apolloState: PropTypes.object,
    };

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />;
    }
  };

export default withApollo;

import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import Layout from '../components/layout/Layout';
import '../node_modules/react-vis/dist/style.css';
import '../styles/tailwind.css';
import '../styles/index.css';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'isomorphic-unfetch';

const url = 'http://disney-metadata-backend.herokuapp.com';

let apolloClient = null;

const create = initialState => {
  const isBrowser = typeof window !== 'undefined';
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: new HttpLink({
      uri: `${url}/graphql`,
      fetch: !isBrowser && fetch,
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
};

const initApollo = initialState => {
  if (typeof window === 'undefined') {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
};

export default initApollo;

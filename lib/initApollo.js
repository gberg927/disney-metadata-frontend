import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'isomorphic-unfetch';

const url = process.env.GRAPHQL_URL;
console.log(url);

let apolloClient = null;

const create = initialState => {
  const isBrowser = typeof window !== 'undefined';
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: new HttpLink({
      uri: `${url}/graphql`,
      fetch: !isBrowser && fetch,
      credentials: 'include',
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

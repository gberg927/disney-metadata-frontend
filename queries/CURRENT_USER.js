import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  query CURRENT_USER {
    currentUser {
      id
      email
    }
  }
`;

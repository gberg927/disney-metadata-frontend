import gql from 'graphql-tag';

export const LIST_RESORTS = gql`
  query LIST_RESORTS {
    resorts {
      id
      name
      slug
    }
  }
`;

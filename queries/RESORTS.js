import gql from 'graphql-tag';

export const RESORTS = gql`
  query RESORTS {
    resorts {
      id
      slug
      abbreviation
      name
      parks {
        id
        slug
        abbreviation
        name
      }
    }
  }
`;

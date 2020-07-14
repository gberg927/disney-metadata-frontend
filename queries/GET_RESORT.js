import gql from 'graphql-tag';

export const GET_RESORT = gql`
  query GET_RESORT($where: ResortWhereInput!) {
    resorts(where: $where) {
      id
      name
      slug
      parks {
        id
        name
        slug
      }
    }
  }
`;

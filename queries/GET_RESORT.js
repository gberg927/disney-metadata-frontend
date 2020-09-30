import gql from 'graphql-tag';

export const GET_RESORT = gql`
  query($id: Int!) {
    resort(where: { id: $id }) {
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

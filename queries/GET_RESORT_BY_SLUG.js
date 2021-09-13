import gql from 'graphql-tag';

export const GET_RESORT_BY_SLUG = gql`
  query GET_RESORT_BY_SLUG($slug: String!) {
    resorts(where: { slug: { equals: $slug } }) {
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

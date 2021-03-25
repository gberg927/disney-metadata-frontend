import gql from 'graphql-tag';

export const GET_PARK = gql`
  query($id: Int!) {
    park(where: { id: $id }) {
      id
      name
      slug
      latitude
      longitude
      timezone
      rides {
        id
        name
        slug
        category
        type
        area
        waitTime {
          timestamp
          active
          status
          amount
        }
      }
      resort {
        name
      }
    }
  }
`;

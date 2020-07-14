import gql from 'graphql-tag';

export const GET_PARK = gql`
  query GET_PARK($where: ParkWhereInput!) {
    parks(where: $where) {
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
        waitTime {
          id
          timestamp
          active
          status
          amount
        }
      }
    }
  }
`;

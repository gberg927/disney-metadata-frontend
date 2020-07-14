import gql from 'graphql-tag';

export const GET_RIDE = gql`
  query GET_RIDE($where: RideWhereInput!) {
    rides(where: $where) {
      id
      name
      slug
      category
      type
      longitude
      latitude
      area
      openedOn
      heightRestriction
      duration
      fastPass
      singleRider
      riderSwap
      waitTimes {
        id
        timestamp
        active
        status
        amount
      }
    }
  }
`;

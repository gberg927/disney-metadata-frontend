import gql from 'graphql-tag';

export const GET_RIDE = gql`
  query GET_RIDE($id: Int!) {
    ride(where: { id: $id }) {
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
        timestamp
        active
        status
        amount
      }
      park {
        name
        resort {
          name
        }
      }
    }
  }
`;

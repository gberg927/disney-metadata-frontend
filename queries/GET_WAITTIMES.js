import gql from 'graphql-tag';

export const GET_WAITTIMES = gql`
  query GET_WAITTIMES(
    $rideId: Int!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    waitTimes(
      where: { rideId: $rideId, startDate: $startDate, endDate: $endDate }
    ) {
      timestamp
      active
      status
      amount
    }
  }
`;

import gql from 'graphql-tag';

export const JOBS = gql`
  query JOBS {
    jobs(orderBy: { startTime: desc }) {
      id
      startTime
      endTime
      created
      user {
        id
        email
      }
    }
  }
`;

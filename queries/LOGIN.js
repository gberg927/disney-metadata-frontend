import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      id
      email
    }
  }
`;

import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    token: login(data: { email: $email, password: $password })
  }
`;

interface Data {
  token: string;
}

export { LOGIN };
export type { Data };

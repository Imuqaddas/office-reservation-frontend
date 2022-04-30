import { gql } from "@apollo/client";

const USERS = gql`
  query users($email: String) {
    users(email: $email) {
      id
      firstname
      lastname
      email
    }
  }
`;

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface Data {
  users: User[];
}

export { USERS };
export type { Data, User };

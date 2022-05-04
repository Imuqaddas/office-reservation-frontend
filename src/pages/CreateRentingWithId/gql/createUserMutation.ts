import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUser($firstname: String!, $lastname: String!, $email: String!, $phone: String!) {
    user: createUser(user: { firstname: $firstname, lastname: $lastname, email: $email, phone: $phone, password: "" }) {
      id
    }
  }
`;

interface User {
  id: number;
}

interface Data {
  user: User;
}

export { CREATE_USER };
export type { Data };

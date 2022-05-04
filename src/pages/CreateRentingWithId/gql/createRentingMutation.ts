import { gql } from "@apollo/client";

const CREATE_RENTING = gql`
  mutation createRenting($office: Int!, $user: Int!, $months: Int!, $start: String!, $end: String!, $created_at: String!) {
    renting: createRenting(renting: { office: $office, user: $user, months: $months, start: $start, end: $end, created_at: $created_at }) {
      id
    }
  }
`;

interface Renting {
  id: number;
}

interface Data {
  renting: Renting;
}

export { CREATE_RENTING };
export type { Data };

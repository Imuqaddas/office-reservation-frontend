import { gql } from "@apollo/client";

const RENTINGS = gql`
  query {
    rentings {
      id
      user {
        firstname
        lastname
      }
      start
      end
      created_at
    }
  }
`;

interface OfficeRenting {
  id: number;
  user: {
    firstname: string;
    lastname: string;
  };
  created_at: string;
  start: string;
  end: string;
}

interface Data {
  rentings: OfficeRenting[];
}

export { RENTINGS };
export type { Data };

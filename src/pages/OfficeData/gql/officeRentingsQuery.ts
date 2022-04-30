import { gql } from "@apollo/client";

const OFFICE_RENTINGS = gql`
  query rentings($id: Int!) {
    rentings(office: $id) {
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

export { OFFICE_RENTINGS };
export type { Data };

import { gql } from "@apollo/client";

const RENTING = gql`
  query renting($id: Int!) {
    renting(id: $id) {
      id
      user {
        firstname
        lastname
        email
        phone
      }
      office {
        id
        office_number
        building {
          name
        }
      }
      start
      end
      months
      created_at
      state_changes {
        id
        state {
          name
          description
        }
        created_at
      }
    }
  }
`;

interface Renting {
  id: number;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };
  office: {
    id: number;
    office_number: string;
    building: {
      name: string;
    };
  };
  start: string;
  end: string;
  months: number;
  created_at: string;
  state_changes: {
    id: number;
    state: {
      name: string;
      description: string;
    };
    created_at: string;
  }[];
}

interface Data {
  renting: Renting;
}

export { RENTING };
export type { Data };

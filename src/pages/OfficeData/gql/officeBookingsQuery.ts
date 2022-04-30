import { gql } from "@apollo/client";

const OFFICE_BOOKINGS = gql`
  query rentings($id: Int!) {
    bookings(office: $id) {
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

interface OfficeBooking {
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
  bookings: OfficeBooking[];
}

export { OFFICE_BOOKINGS };
export type { Data };

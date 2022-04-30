import { gql } from "@apollo/client";

const OFFICE = gql`
  query officeServices($id: Int!) {
    office(id: $id) {
      id
      services {
        id
      }
      items {
        id
        item {
          id
        }
        pieces
      }
    }
  }
`;

interface Office {
  id: number;
  services: { id: number }[];
  items: { id: number; item: { id: number }; pieces: number }[];
}

interface Data {
  office: Office;
}

export { OFFICE };
export type { Data };

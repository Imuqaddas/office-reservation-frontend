import { gql } from "@apollo/client";

const OFFICE = gql`
  query office($id: Int!) {
    office(id: $id) {
      id
      floor
      office_number
      size
      building {
        name
      }
    }
  }
`;

interface Office {
  id: number;
  floor: number;
  office_number: string;
  size: number;
  building: {
    name: string;
  };
}

interface Data {
  office: Office;
}

export { OFFICE };
export type { Data };

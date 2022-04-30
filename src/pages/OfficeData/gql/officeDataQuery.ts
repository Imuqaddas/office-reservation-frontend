import { gql } from "@apollo/client";

const OFFICE_DATA = gql`
  query office($id: Int!) {
    office(id: $id) {
      id
      office_number
      floor
      size
      building {
        id
        name
      }
      services {
        id
        name
      }
      items {
        id
        item {
          name
        }
        pieces
      }
    }
  }
`;

interface Office {
  id: number;
  building: {
    id: number;
    name: string;
  };
  floor: number;
  office_number: string;
  size: number;
  services: {
    id: number;
    name: string;
  }[];
  items: {
    id: number;
    item: {
      name: string;
    };
    pieces: number;
  }[];
}

interface Data {
  office: Office;
}

export { OFFICE_DATA };
export type { Data };

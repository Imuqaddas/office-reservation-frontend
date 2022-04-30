import { gql } from "@apollo/client";

const OFFICES = gql`
  query {
    offices {
      id
      building {
        name
      }
      floor
      office_number
      size
    }
  }
`;

interface Office {
  id: number;
  building: {
    name: string;
  };
  floor: number;
  office_number: string;
  size: number;
}

interface Data {
  offices: Office[];
}

export { OFFICES };
export type { Data };

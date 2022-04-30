import { gql } from "@apollo/client";

const OFFICES = gql`
  query offices($building: Int!) {
    offices(building: $building) {
      id
      floor
      office_number
      size
    }
  }
`;

interface Office {
  id: number;
  floor: number;
  office_number: string;
  size: number;
}

interface Data {
  offices: Office[];
}

export { OFFICES };
export type { Data };

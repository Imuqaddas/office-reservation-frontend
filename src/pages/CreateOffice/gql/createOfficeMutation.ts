import { gql } from "@apollo/client";

const CREATE_OFFICE = gql`
  mutation createOffice($building: Int!, $floor: Int!, $office_number: String!, $size: Int!) {
    createOffice(office: { building: $building, floor: $floor, office_number: $office_number, size: $size }) {
      id
    }
  }
`;

interface Office {
  id: number;
}

interface Data {
  createOffice: Office;
}

export { CREATE_OFFICE };
export type { Data };

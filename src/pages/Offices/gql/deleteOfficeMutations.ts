import { gql } from "@apollo/client";

const DELETE_OFFICE = gql`
  mutation deleteOffice($id: Int!) {
    deleteOffice(id: $id)
  }
`;

interface Data {
  deleteOffice: number;
}

export { DELETE_OFFICE };
export type { Data };

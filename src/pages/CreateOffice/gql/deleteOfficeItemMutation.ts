import { gql } from "@apollo/client";

const DELETE_OFFICE_ITEM = gql`
  mutation deleteOfficeItem($id: Int!) {
    deleteOfficeItem(id: $id)
  }
`;

interface Data {
  deleteOfficeItem: number;
}

export { DELETE_OFFICE_ITEM };
export type { Data };

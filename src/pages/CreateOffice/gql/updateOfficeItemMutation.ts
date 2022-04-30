import { gql } from "@apollo/client";

const UPDATE_OFFICE_ITEM = gql`
  mutation updateOfficeItem($id: Int!, $pieces: Int!) {
    updateOfficeItem(id: $id, officeItem: { pieces: $pieces }) {
      id
    }
  }
`;

interface OfficeItem {
  id: number;
}

interface Data {
  updateOfficeItem: OfficeItem;
}

export { UPDATE_OFFICE_ITEM };
export type { Data };

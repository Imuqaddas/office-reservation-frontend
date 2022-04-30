import { gql } from "@apollo/client";

const CREATE_OFFICE_ITEM = gql`
  mutation createOfficeItem($office: Int!, $item: Int!, $pieces: Int!) {
    createOfficeItem(officeItem: { office: $office, item: $item, pieces: $pieces }) {
      id
    }
  }
`;

interface OfficeItem {
  id: number;
}

interface Data {
  createOfficeItem: OfficeItem;
}

export { CREATE_OFFICE_ITEM };
export type { Data };

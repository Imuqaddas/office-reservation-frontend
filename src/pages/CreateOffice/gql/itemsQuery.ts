import { gql } from "@apollo/client";

const ITEMS = gql`
  query {
    items {
      id
      name
    }
  }
`;

interface Item {
  id: number;
  name: string;
}

interface Data {
  items: Item[];
}

export { ITEMS };
export type { Data };

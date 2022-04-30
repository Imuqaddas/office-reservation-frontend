import { gql } from "@apollo/client";

const BUILDINGS = gql`
  query {
    buildings {
      id
      name
    }
  }
`;

interface Building {
  id: number;
  name: string;
}

interface Data {
  buildings: Building[];
}

export { BUILDINGS };
export type { Data };

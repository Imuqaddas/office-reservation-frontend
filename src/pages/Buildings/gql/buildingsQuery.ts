import { gql } from "@apollo/client";

const BUILDINGS = gql`
  query {
    buildings {
      id
      name
      location
      floors
    }
  }
`;

interface Building {
  id: number;
  name: string;
  location: string;
  floors: number;
}

interface Data {
  buildings: Building[];
}

export { BUILDINGS };
export type { Data };

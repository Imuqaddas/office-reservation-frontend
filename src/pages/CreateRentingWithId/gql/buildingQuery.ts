import { gql } from "@apollo/client";

const BUILDING = gql`
  query buildingQuery($id: Int!) {
    building(id: $id) {
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
  building: Building;
}

export { BUILDING };
export type { Data };

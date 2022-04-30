import { gql } from "@apollo/client";

const BUILDING = gql`
  query buildingQuery($id: Int!) {
    building(id: $id) {
      id
      name
      floors
    }
  }
`;

interface Building {
  id: number;
  name: string;
  floors: number;
}

interface Data {
  building: Building;
}

export { BUILDING };
export type { Data };

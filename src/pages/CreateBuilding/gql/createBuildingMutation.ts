import { gql } from "@apollo/client";

const CREATE_BUILDING = gql`
  mutation createBuilding($name: String!, $location: String!, $floors: Int!) {
    building: createBuilding(building: { name: $name, location: $location, floors: $floors, owner: 1 }) {
      id
    }
  }
`;

interface Building {
  id: number;
}

interface Data {
  building: Building;
}

export { CREATE_BUILDING };
export type { Data };

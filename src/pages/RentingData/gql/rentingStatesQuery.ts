import { gql } from "@apollo/client";

const RENTING_STATES = gql`
  query {
    rentingStates {
      id
      name
      description
    }
  }
`;

interface RentingState {
  id: number;
  name: string;
  description: string;
}

interface Data {
  rentingStates: RentingState[];
}

export { RENTING_STATES };
export type { Data };

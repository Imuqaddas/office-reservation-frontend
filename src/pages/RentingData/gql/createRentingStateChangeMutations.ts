import { gql } from "@apollo/client";

const CREATE_RENTING_STATE_CHANGE = gql`
  mutation createRentingStateChange($renting: Int!, $state: Int!, $created_at: String!) {
    rentingStateChange: createRentingStateChange(rentingStateChange: { renting: $renting, state: $state, created_at: $created_at }) {
      id
    }
  }
`;

interface RentingStateChange {
  id: number;
}

interface Data {
  rentingStateChange: RentingStateChange;
}

export { CREATE_RENTING_STATE_CHANGE };
export type { Data };

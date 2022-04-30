import { gql } from "@apollo/client";

const OFFICE_PRICING = gql`
  query prices($id: Int!) {
    officePricings(office: $id) {
      id
      time_unit {
        name
      }
      unit_price
      created_at
    }
  }
`;

interface OfficePricing {
  id: number;
  time_unit: {
    name: string;
  };
  unit_price: number;
  created_at: string;
}

interface Data {
  officePricings: OfficePricing[];
}

export { OFFICE_PRICING };
export type { Data };

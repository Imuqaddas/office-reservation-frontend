import { gql } from "@apollo/client";

const CREATE_OFFICE_PRICING = gql`
  mutation createOfficePricing($office: Int!, $time_unit: Int!, $unit_price: Int!, $created_at: String!) {
    officePricing: createOfficePricing(officePricing: { office: $office, time_unit: $time_unit, unit_price: $unit_price, created_at: $created_at }) {
      id
    }
  }
`;

interface OfficePricing {
  id: number;
}

interface Data {
  officePricing: OfficePricing;
}

export { CREATE_OFFICE_PRICING };
export type { Data };

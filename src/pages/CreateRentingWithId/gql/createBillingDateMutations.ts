import { gql } from "@apollo/client";

const CREATE_BILLING = gql`
  mutation createBillingData($user: Int!, $billingName: String!, $billingAddress: String!, $created_at: String!) {
    billingData: createBillingData(billingData: { user: $user, billing_name: $billingName, billing_address: $billingAddress, is_company: false, created_at: $created_at }) {
      id
    }
  }
`;

interface BillingData {
  id: number;
}

interface Data {
  billingData: BillingData;
}

export { CREATE_BILLING };
export type { Data };

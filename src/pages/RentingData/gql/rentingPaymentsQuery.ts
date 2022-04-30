import { gql } from "@apollo/client";

const RENTING_PAYMENTS = gql`
  query rentingPayments($renting: Int!) {
    payments(renting: $renting) {
      id
      name
      net_amount
      gross_amount
      payment_method {
        name
      }
      due_date
      paid_at
      created_at
      billing_data {
        billing_name
        billing_address
      }
    }
  }
`;

interface RentingPayment {
  id: number;
  name: string;
  net_amount: number;
  gross_amount: number;
  payment_method: { name: string };
  due_date: string;
  paid_at: string | null;
  created_at: string;
  billing_data: {
    billing_name: string;
    billing_address: string;
  };
}

interface Data {
  payments: RentingPayment[];
}

export { RENTING_PAYMENTS };
export type { Data };

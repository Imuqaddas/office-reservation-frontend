import { gql } from "@apollo/client";

const PAY = gql`
  mutation pay($id: Int!, $date: String!) {
    payment: updatePayment(id: $id, payment: { paid_at: $date }) {
      id
    }
  }
`;

interface Payment {
  id: number;
}

interface Data {
  payment: Payment;
}

export { PAY };
export type { Data };

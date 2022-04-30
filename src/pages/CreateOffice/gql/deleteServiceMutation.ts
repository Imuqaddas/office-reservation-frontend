import { gql } from "@apollo/client";

const DELETE_SERVICE = gql`
  mutation deleteService($office: Int!, $service: Int!) {
    office: unjoinServiceFromOffice(office: $office, service: $service) {
      id
    }
  }
`;

interface Office {
  id: number;
}

interface Data {
  office: Office;
}

export { DELETE_SERVICE };
export type { Data };

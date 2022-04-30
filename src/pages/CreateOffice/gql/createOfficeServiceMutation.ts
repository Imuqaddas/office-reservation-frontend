import { gql } from "@apollo/client";

const CREATE_OFFICE_SERVICE = gql`
  mutation createOfficeService($office: Int!, $service: Int!) {
    createOfficeService(officeService: { office: $office, service: $service }) {
      id
    }
  }
`;

interface OfficeService {
  id: number;
}

interface Data {
  createOfficeService: OfficeService;
}

export { CREATE_OFFICE_SERVICE };
export type { Data };

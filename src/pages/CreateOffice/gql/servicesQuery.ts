import { gql } from "@apollo/client";

const SERVICES = gql`
  query {
    services {
      id
      name
    }
  }
`;

interface Service {
  id: number;
  name: string;
}

interface Data {
  services: Service[];
}

export { SERVICES };
export type { Data };

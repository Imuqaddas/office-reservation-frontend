import { Buffer } from "buffer";

interface Auth {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  company: {
    id: number;
    name: string;
    subdomain: string;
  };
  iat: number;
}

function useAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    const payload = token.split(".")[1];
    const decoded: string = Buffer.from(payload, "base64").toString();

    const user = JSON.parse(decoded) as Auth;
    return user;
  }
}

export default useAuth;
export type { Auth };

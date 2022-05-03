/** @jsxImportSource @emotion/react */
import { useMutation } from "@apollo/client";
import { SerializedStyles, css } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSaveToken from "../../hooks/useSaveToken";
import { LOGIN, Data } from "./gql/loginMutation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login] = useMutation<Data>(LOGIN, { variables: { email, password } });
  const navigate = useNavigate();
  const saveToken = useSaveToken();

  const handleLogin = async () => {
    try {
      const resp = await login();

      saveToken(resp.data?.token as string);
      navigate("/");
    } catch (err) {
      const error = err as Error;
      createError(error.message);
    }
  };

  const createError = (message: string) => {
    setError(message);

    setTimeout(() => setError(""), 3000);
  };

  return (
    <Box css={containerStyles}>
      <Typography variant="h3" color="white">
        Login
      </Typography>
      <img src="https://officereservation.s3.eu-central-1.amazonaws.com/test-company3" alt="logo" css={logoStyles} />
      <form css={formStyles}>
        <FormControl fullWidth>
          <InputLabel>Email</InputLabel>
          <OutlinedInput label="Email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Password</InputLabel>
          <OutlinedInput label="Password" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </FormControl>

        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </form>
    </Box>
  );
}

const containerStyles: SerializedStyles = css`
  width: 100vw;
  height: 100vh;
  background-color: #34495e;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const logoStyles: SerializedStyles = css`
  margin-top: 20px;
  max-width: 300px;
`;

const formStyles: SerializedStyles = css`
  background-color: #ecf0f1;
  width: 400px;
  max-width: 80%;
  height: min-content;
  max-height: 70%;

  padding: 20px;
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > * + * {
    margin-top: 15px !important;
  }
`;

export default Login;

/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import Typography from "@mui/material/Typography";
import { useState } from "react";
import { CREATE_BILLING } from "../gql/createBillingDateMutations";
import { CREATE_USER, Data as User } from "../gql/createUserMutation";

function CreateUser(props: { onUserChange: (id: number) => void }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [billingName, setBillingName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [created, setCreated] = useState(false);
  const isValid = useValidator(firstname, lastname, email, phone, billingName, billingAddress);
  const [createUser] = useMutation<User>(CREATE_USER, { variables: { firstname, lastname, email, phone } });
  const [createBillingData] = useMutation(CREATE_BILLING);

  return (
    <Box sx={{ backgroundColor: "white", padding: "15px" }}>
      <FormControl css={inputStyle} fullWidth>
        <InputLabel htmlFor="outlined-adornment-amount">Firstname</InputLabel>
        <OutlinedInput value={firstname} label="Firstname" onChange={(event) => setFirstname(event.target.value)} />
      </FormControl>
      <FormControl css={inputStyle} fullWidth>
        <InputLabel htmlFor="outlined-adornment-amount">Lastname</InputLabel>
        <OutlinedInput value={lastname} label="Lastname" onChange={(event) => setLastname(event.target.value)} />
      </FormControl>
      <FormControl css={inputStyle} fullWidth>
        <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
        <OutlinedInput value={email} label="Email" onChange={(event) => setEmail(event.target.value)} />
      </FormControl>
      <FormControl css={inputStyle} fullWidth>
        <InputLabel htmlFor="outlined-adornment-amount">Phone</InputLabel>
        <OutlinedInput value={phone} label="Phone" onChange={(event) => setPhone(event.target.value)} />
      </FormControl>
      <FormControl css={inputStyle} fullWidth>
        <InputLabel htmlFor="outlined-adornment-amount">Billing name</InputLabel>
        <OutlinedInput value={billingName} label="Billing name" onChange={(event) => setBillingName(event.target.value)} />
      </FormControl>
      <FormControl css={inputStyle} fullWidth>
        <InputLabel htmlFor="outlined-adornment-amount">Billing address</InputLabel>
        <OutlinedInput value={billingAddress} label="Billing address" onChange={(event) => setBillingAddress(event.target.value)} />
      </FormControl>
      {created && (
        <Typography variant="body1" color="green" css={hintStyle}>
          Successfuly created.
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "20px",
        }}
      >
        <Button
          onClick={async () => {
            const resp = await createUser();
            const user = resp.data?.user.id as number;
            await createBillingData({ variables: { billingName, billingAddress, created_at: new Date().toISOString(), user } });
            setCreated(true);
            props.onUserChange(resp.data?.user.id as number);
          }}
          disabled={!isValid || created}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

function useValidator(firstname: string, lastname: string, email: string, phone: string, billingName: string, billingAddress: string) {
  return firstname !== "" && lastname !== "" && email !== "" && phone !== "" && billingName !== "" && billingAddress !== "";
}

const inputStyle = css`
  margin-top: 20px;
`;

const hintStyle = css`
  margin-top: 15px;
`;

export default CreateUser;

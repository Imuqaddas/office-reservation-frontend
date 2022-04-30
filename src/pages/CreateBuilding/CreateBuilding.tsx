/** @jsxImportSource @emotion/react */
import { useMutation } from "@apollo/client";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { CREATE_BUILDING } from "./gql/createBuildingMutation";

function CreateBuilding() {
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [floors, setFloors] = useState("");
  const isValid = useValidator(name, zip, city, address, floors);

  const [createBuilding, { loading }] = useMutation(CREATE_BUILDING, { variables: { name, location: `${zip} ${city}, ${address}`, floors: parseInt(floors, 10) } });
  const navigate = useNavigate();

  return (
    <Layout>
      <Typography variant="h4">Create Building</Typography>
      <Box>
        <Box sx={{ backgroundColor: "white", marginTop: "20px", padding: "15px" }}>
          <FormControl css={inputStyle} fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
            <OutlinedInput value={name} label="Name" onChange={(event) => setName(event.target.value)} />
          </FormControl>
          <FormControl css={inputStyle} fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Zip</InputLabel>
            <OutlinedInput value={zip} label="Zip" onChange={(event) => setZip(event.target.value)} />
          </FormControl>
          <FormControl css={inputStyle} fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">City</InputLabel>
            <OutlinedInput value={city} label="City" onChange={(event) => setCity(event.target.value)} />
          </FormControl>
          <FormControl css={inputStyle} fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Address</InputLabel>
            <OutlinedInput value={address} label="Address" onChange={(event) => setAddress(event.target.value)} />
          </FormControl>
          <FormControl css={inputStyle} fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Floors</InputLabel>
            <OutlinedInput value={floors} label="Floors" type="number" onChange={(event) => setFloors(event.target.value)} />
          </FormControl>
        </Box>
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
              await createBuilding();
              navigate("/buildings");
            }}
            disabled={!isValid || loading}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

function useValidator(name: string, zip: string, city: string, address: string, floors: string) {
  return name !== "" && zip !== "" && city !== "" && address !== "" && floors !== "";
}

const inputStyle = css`
  margin-top: 20px;
`;

export default CreateBuilding;

/** @jsxImportSource @emotion/react */
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { css } from "@emotion/react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import StepOneProps from "./StepOneProps";
import { BUILDING, Data as BuildingData } from "../gql/buildingQuery";
import { BUILDINGS, Data as BuildingsData } from "../gql/buildingsQuery";
import { CREATE_OFFICE, Data as OfficeData } from "../gql/createOfficeMutation";

function StepOne(props: StepOneProps) {
  const { data: buildingsData } = useQuery<BuildingsData>(BUILDINGS);
  const [buildingId, setBuildingId] = useState<string>("");
  const { data: buildingData } = useQuery<BuildingData>(BUILDING, { variables: { id: buildingId } });

  const [floor, setFloor] = useState<string>("");
  const [officeNumber, setOfficeNumber] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const isFormValid = useValidator(buildingId, floor, officeNumber, size);

  const [createOffice, { loading: mutationLoading, error }] = useMutation<OfficeData>(CREATE_OFFICE, {
    variables: {
      building: buildingId,
      floor: floor,
      office_number: `${floor}-${officeNumber}`,
      size: parseInt(size, 10),
    },
  });

  return (
    <Box>
      <Box sx={{ backgroundColor: "white", marginTop: "20px", padding: "15px" }}>
        {renderBuildingInput(setBuildingId, buildingId, buildingsData)}
        {renderFloorInput(setFloor, floor, buildingData)}
        {renderOfficeNumberInput(setOfficeNumber, floor)}
        {renderSizeInput(setSize)}
        {renderError(error)}
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
            const resp = await createOffice();
            props.onOfficeCreate(resp.data?.createOffice.id as number);
          }}
          disabled={mutationLoading || !isFormValid}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

function useValidator(buildingId: string, floor: string, officeNumber: string, size: string) {
  return buildingId !== "" && floor !== "" && officeNumber !== "" && size !== "";
}

function renderBuildingInput(setBuildingId: Dispatch<SetStateAction<string>>, buildingId: string, buildingsData?: BuildingsData) {
  const handleChange = (event: SelectChangeEvent) => {
    setBuildingId(event.target.value as string);
  };

  return (
    <FormControl css={inputStyle} fullWidth>
      <InputLabel id="building-input">Building</InputLabel>
      <Select labelId="building-input-label" id="building-input" label="Building" value={buildingId} onChange={handleChange}>
        {buildingsData?.buildings.map((building) => (
          <MenuItem value={building.id} key={building.id}>
            {building.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function renderFloorInput(setFloor: Dispatch<SetStateAction<string>>, floor: string, buildingData?: BuildingData) {
  const handleChange = (event: SelectChangeEvent) => {
    setFloor(event.target.value as string);
  };

  return (
    <FormControl css={inputStyle} fullWidth>
      <InputLabel id="building-input">Floor</InputLabel>
      <Select labelId="building-input-label" id="building-input" label="Floor" value={floor} onChange={handleChange}>
        {buildingData &&
          Array.from({ length: buildingData.building.floors + 1 }, (x, i) => i).map((floor: number) => (
            <MenuItem value={floor} key={floor}>
              {floor}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

function renderSizeInput(setSize: Dispatch<SetStateAction<string>>) {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSize(event.target.value as string);
  };

  return (
    <FormControl css={inputStyle} fullWidth>
      <InputLabel htmlFor="outlined-adornment-amount">Size</InputLabel>
      <OutlinedInput endAdornment={<InputAdornment position="end">m2</InputAdornment>} label="Size" onChange={handleChange} />
    </FormControl>
  );
}

function renderOfficeNumberInput(setOfficeNumber: Dispatch<SetStateAction<string>>, floor: string) {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOfficeNumber(event.target.value as string);
  };

  return (
    <FormControl css={inputStyle} fullWidth>
      <InputLabel htmlFor="outlined-adornment-amount">Office number</InputLabel>
      <OutlinedInput startAdornment={<InputAdornment position="start">{floor} -</InputAdornment>} label="Office number" onChange={handleChange} />
    </FormControl>
  );
}

function renderError(error?: ApolloError) {
  if (error) {
    return (
      <Typography variant="body1" color="red">
        {error.message}
      </Typography>
    );
  }
}

const inputStyle = css`
  margin-top: 20px;
`;

export default StepOne;

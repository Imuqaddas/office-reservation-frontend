/** @jsxImportSource @emotion/react */
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { BUILDINGS, Data as BuildingsData } from "../Buildings/gql/buildingsQuery";
import { OFFICES, Data as OfficesData } from "./gql/officesQuery";

function CreateOffice() {
  const { building, office } = useParams();
  const { data: buildingsData } = useQuery<BuildingsData>(BUILDINGS);
  const [buildingId, setBuildingId] = useState<string>(building || "");
  const [officeId, setOfficeId] = useState<string>(office || "");

  return (
    <Layout>
      <Typography variant="h4">Create renting</Typography>
      <Typography variant="h5">Office</Typography>
      <BuildingInput defaultBuilding={buildingId} setBuildingId={setBuildingId} buildingsData={buildingsData} />
      <OfficesInput setOfficeId={setOfficeId} buildingId={buildingId} />
      <Typography variant="h5">User</Typography>
    </Layout>
  );
}

interface BuildingInputProps {
  setBuildingId: Dispatch<SetStateAction<string>>;
  buildingsData?: BuildingsData;
  defaultBuilding: string;
}

function BuildingInput(props: BuildingInputProps) {
  const handleChange = (event: SelectChangeEvent) => {
    props.setBuildingId(event.target.value as string);
  };

  return (
    <FormControl css={inputStyle} fullWidth>
      <InputLabel id="building-input">Building</InputLabel>
      <Select labelId="building-input-label" id="building-input" label="Building" defaultValue={props.defaultBuilding} onChange={handleChange}>
        {props.buildingsData?.buildings.map((building) => (
          <MenuItem value={building.id} key={building.id}>
            {building.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

interface OfficesInputProps {
  setOfficeId: Dispatch<SetStateAction<string>>;
  buildingId: string;
}

function OfficesInput(props: OfficesInputProps) {
  const { data: officesData } = useQuery<OfficesData>(OFFICES, { variables: { building: parseInt(props.buildingId, 10) } });

  const handleChange = (event: SelectChangeEvent) => {
    props.setOfficeId(event.target.value as string);
  };

  return (
    <FormControl css={inputStyle} fullWidth>
      <InputLabel id="building-input">Office</InputLabel>
      <Select labelId="building-input-label" id="building-input" label="Office" onChange={handleChange}>
        {officesData?.offices?.map((office) => (
          <MenuItem value={office.id} key={office.id}>
            #{office.id} - {office.office_number} - {office.size}m2
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const inputStyle = css`
  margin-top: 20px;
`;

export default CreateOffice;

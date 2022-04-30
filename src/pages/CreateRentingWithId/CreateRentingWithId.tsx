/** @jsxImportSource @emotion/react */
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { OFFICE, Data as OfficeData } from "./gql/officeQuery";
import { USERS, Data as UsersData, User } from "./gql/usersQuery";

function CreateOffice() {
  const { officeId } = useParams();
  const { data: officeData } = useQuery<OfficeData>(OFFICE, { variables: { id: parseInt(officeId as string, 10) } });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [userId, setUserId] = useState<number>();

  return (
    <Layout>
      <Typography variant="h4">Create renting</Typography>
      <Typography variant="h5">Office</Typography>
      <OfficeDataTable officeData={officeData} />
      <Typography variant="h5">User</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={(_, newValue: number) => setTabIndex(newValue)}>
          <Tab label="Find user" />
          <Tab label="Create user" />
        </Tabs>
      </Box>

      {tabIndex === 0 && <SearchUser onUserChange={setUserId} />}
      {tabIndex === 1 && <SearchUser onUserChange={setUserId} />}
      {userId}
    </Layout>
  );
}

function OfficeDataTable(props: { officeData: OfficeData | undefined }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell variant="head">ID</TableCell>
            <TableCell>{props.officeData?.office.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Building</TableCell>
            <TableCell>{props.officeData?.office.building.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Floor</TableCell>
            <TableCell>{props.officeData?.office.floor}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Office number</TableCell>
            <TableCell>{props.officeData?.office.office_number}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Size</TableCell>
            <TableCell>{props.officeData?.office.size} m2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SearchUser(props: { onUserChange: (id: number) => void }) {
  const [open, setOpen] = useState(false);
  const { data: usersData, loading } = useQuery<UsersData>(USERS);

  return (
    <Box sx={{ backgroundColor: "white", padding: "15px" }}>
      <Autocomplete
        sx={{ width: 300, marginTop: "15px" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, newValue) => {
          if (newValue !== null) props.onUserChange(newValue.id);
        }}
        isOptionEqualToValue={(option: User, value: User) => option.id === value.id}
        getOptionLabel={(option: User) => `#${option.id} - ${option.firstname} ${option.lastname} - ${option.email}`}
        options={usersData?.users ?? []}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Users"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}

const inputStyle = css`
  margin-top: 20px;
`;

export default CreateOffice;

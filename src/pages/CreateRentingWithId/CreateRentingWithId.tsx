/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";

import Tabs from "@mui/material/Tabs";

import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import CreateUser from "./components/CreateUser";
import OfficeDataTable from "./components/OfficeDataTable";
import SearchUser from "./components/SearchUser";
import Term from "./components/Term";
import { CREATE_RENTING, Data as RentingData } from "./gql/createRentingMutation";
import { OFFICE, Data as OfficeData } from "./gql/officeQuery";

function CreateRentingWithId() {
  const { officeId, buildingId } = useParams();
  const { data: officeData } = useQuery<OfficeData>(OFFICE, { variables: { id: parseInt(officeId as string, 10) } });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [userId, setUserId] = useState<number>();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [months, setMonths] = useState("");
  const [createRenting] = useMutation<RentingData>(CREATE_RENTING, {
    variables: {
      office: parseInt(officeId as string, 10),
      user: userId,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      months: parseInt(months, 10),
      created_at: new Date().toISOString(),
    },
  });
  const navigate = useNavigate();

  return (
    <Layout>
      <Typography variant="h4">Create renting</Typography>
      <Typography variant="h5" css={headerStyle}>
        Office
      </Typography>
      <OfficeDataTable officeData={officeData} />
      <Typography variant="h5" css={headerStyle}>
        User
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={(_, newValue: number) => setTabIndex(newValue)}>
          <Tab label="Find user" />
          <Tab label="Create user" />
        </Tabs>
      </Box>

      {tabIndex === 0 && <SearchUser onUserChange={setUserId} />}
      {tabIndex === 1 && <CreateUser onUserChange={setUserId} />}

      <Term
        onDatesChange={(start: string, months: string, end: string) => {
          setStart(start);
          setMonths(months);
          setEnd(end);
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={async () => {
            const resp = await createRenting();
            navigate(`/renting/${resp.data?.renting.id}`);
          }}
        >
          Create
        </Button>
      </Box>
    </Layout>
  );
}

const inputStyle = css`
  margin-top: 20px;
`;

const headerStyle = css`
  margin: 10px 0;
`;

export default CreateRentingWithId;

/** @jsxImportSource @emotion/react */
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { ApolloError, useQuery } from "@apollo/client";

import Layout from "../../components/Layout/Layout";
import { BUILDINGS, Data } from "./gql/buildingsQuery";
import { Link } from "react-router-dom";

function Buildings() {
  const { error, data } = useQuery<Data>(BUILDINGS);

  return (
    <Layout>
      <Typography variant="h4">Buildings</Typography>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Floors</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTable(data)}
            {renderError(error)}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "20px",
        }}
      >
        <Button component={Link} to="/buildings/create" variant="contained" color="success">
          Create
        </Button>
      </Box>
    </Layout>
  );
}

function renderTable(data: Data | undefined) {
  if (data) {
    return data.buildings.map((building) => (
      <TableRow key={building.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>#{building.id}</TableCell>
        <TableCell>{building.name}</TableCell>
        <TableCell>{building.location}</TableCell>
        <TableCell>{building.floors}</TableCell>
      </TableRow>
    ));
  }
}

function renderError(error: ApolloError | undefined) {
  if (error) {
    return (
      <Typography variant="body1" color="red">
        {error.message}
      </Typography>
    );
  }
}

export default Buildings;

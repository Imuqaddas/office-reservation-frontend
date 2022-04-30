import { useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Layout from "../../components/Layout/Layout";
import { RENTINGS, Data as RentingsType } from "./gql/rentingsQuery";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import OpenInNew from "@mui/icons-material/OpenInNew";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

function Rentings() {
  const { data: officeRentings } = useQuery<RentingsType>(RENTINGS);
  const navigate = useNavigate();

  return (
    <Layout>
      <Typography variant="h4">Rentings</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {officeRentings?.rentings.map((renting) => (
              <TableRow key={renting.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>#{renting.id}</TableCell>
                <TableCell>{`${renting.user.firstname} ${renting.user.lastname}`} </TableCell>
                <TableCell>{new Date(parseInt(renting.start, 10)).toLocaleDateString("hu-HU")}</TableCell>
                <TableCell>{new Date(parseInt(renting.end, 10)).toLocaleDateString("hu-HU")}</TableCell>
                <TableCell>{new Date(parseInt(renting.created_at, 10)).toLocaleString("hu-HU")}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <Tooltip title="Open">
                      <IconButton color="primary" aria-label="open" component="span" onClick={() => navigate(`/renting/${renting.id}`)}>
                        <OpenInNew />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton color="primary" aria-label="edit" component="span">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" aria-label="delete" component="span">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
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
        <Button component={Link} to="/rentings/create" variant="contained" color="success">
          Create
        </Button>
      </Box>
    </Layout>
  );
}

export default Rentings;

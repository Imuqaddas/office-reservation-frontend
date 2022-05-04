import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Data as OfficeData } from "../gql/officeQuery";

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

export default OfficeDataTable;

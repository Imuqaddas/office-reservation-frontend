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
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

import { ApolloError, useMutation, useQuery } from "@apollo/client";

import Layout from "../../components/Layout/Layout";
import { OFFICES, Data } from "./gql/officesQuery";
import { css } from "@emotion/react";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { Edit, OpenInNew } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { DELETE_OFFICE } from "./gql/deleteOfficeMutations";

function Offices() {
  const { error, data, refetch } = useQuery<Data>(OFFICES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState(0);
  const navigate = useNavigate();

  const onDeleteClick = (id: number) => {
    setSelectedForDelete(id);
    setDialogOpen(true);
  };

  const onDeleteCancel = () => {
    setDialogOpen(false);
    setSelectedForDelete(0);
  };

  const onDelete = () => {
    refetch();
    setDialogOpen(false);
    setSelectedForDelete(0);
  };

  return (
    <Layout>
      <Typography variant="h4">Offices</Typography>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Building</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Office number</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTable(data, navigate, onDeleteClick)}
            {renderError(error)}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog open={dialogOpen} onDeleteCancel={onDeleteCancel} onDelete={onDelete} office={selectedForDelete}></DeleteDialog>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "20px",
        }}
      >
        <Button component={Link} to="/offices/create" variant="contained" color="success">
          Create
        </Button>
      </Box>
    </Layout>
  );
}

function renderTable(data: Data | undefined, navigate: NavigateFunction, onDeleteClick: (id: number) => void) {
  if (data) {
    return data.offices.map((office) => (
      <TableRow key={office.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>#{office.id}</TableCell>
        <TableCell>{office.building.name}</TableCell>
        <TableCell>{office.floor}</TableCell>
        <TableCell>{office.office_number}</TableCell>
        <TableCell>{office.size} m2</TableCell>
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
              <IconButton color="primary" aria-label="open" component="span" onClick={() => navigate(`/office/${office.id}`)}>
                <OpenInNew />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton color="primary" aria-label="edit" component="span">
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" aria-label="delete" component="span" onClick={() => onDeleteClick(office.id)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
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

function DeleteDialog(props: { office: number; open: boolean; onDeleteCancel: () => void; onDelete: () => void }) {
  const [deleteOffice] = useMutation(DELETE_OFFICE, { variables: { id: props.office } });
  const [error, setError] = useState("");

  const onDeleteCancel = () => {
    setError("");
    props.onDeleteCancel();
  };

  return (
    <Dialog open={props.open} onClose={onDeleteCancel}>
      <DialogTitle id="alert-dialog-title">Are you sure you want to delete office #{props.office}?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleting an office cannot be undone. You are not able to delete an office, if something is referencing it, e.g: existing rentings, bookings, pricing, etc.
        </DialogContentText>
        {error !== undefined && (
          <DialogContentText
            color="error"
            css={css`
              margin-top: 15px;
            `}
          >
            {error}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeleteCancel}>Cancel</Button>
        <Button
          onClick={async () => {
            try {
              await deleteOffice();
              props.onDelete();
            } catch (err) {
              setError("You can't delete this office, since other records are referencing it.");
            }
          }}
          color="error"
          disabled={error !== ""}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Offices;

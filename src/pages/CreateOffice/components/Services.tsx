/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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

import { ApolloError, MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";
import { SERVICES, Data as ServiceData } from "../gql/servicesQuery";
import { OFFICE, Data as OfficeData } from "../gql/officeServicesQuery";
import ServicesProps from "./ServicesProps";
import { CREATE_OFFICE_SERVICE, Data as OfficeDataDeletedService } from "../gql/createOfficeServiceMutation";
import { DELETE_SERVICE } from "../gql/deleteServiceMutation";

function Services(props: ServicesProps) {
  const { error: serviceError, data: serviceData, refetch: refetchServices } = useQuery<ServiceData>(SERVICES);
  const { error: officeError, data: officeData, refetch: refetchOfficeData } = useQuery<OfficeData>(OFFICE, { variables: { id: props.officeId } });
  const [createOfficeService, { loading: mutationLoading, error }] = useMutation(CREATE_OFFICE_SERVICE);
  const [deleteOfficeService] = useMutation(DELETE_SERVICE);

  return (
    <>
      <Typography
        variant="h5"
        css={css`
          margin-top: 15px;
        `}
      >
        Services
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTable(serviceData, officeData, createOfficeService, refetchOfficeData, deleteOfficeService)}
            {renderError(serviceError || officeError)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function renderTable(
  serviceData: ServiceData | undefined,
  officeData: OfficeData | undefined,
  createOfficeService: (options?: MutationFunctionOptions<OfficeData>) => Promise<any>,
  refetchOfficeData: () => Promise<any>,
  deleteOfficeService: (options?: MutationFunctionOptions<OfficeDataDeletedService>) => Promise<any>
) {
  if (serviceData && officeData) {
    return serviceData.services.map((service) => (
      <TableRow key={service.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>#{service.id}</TableCell>
        <TableCell>{service.name}</TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            {officeHasService(service.id, officeData) ? (
              <Button
                color="error"
                variant="outlined"
                size="small"
                onClick={async () => {
                  await deleteOfficeService({ variables: { office: officeData.office.id, service: service.id } });
                  refetchOfficeData();
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={async () => {
                  await createOfficeService({ variables: { office: officeData.office.id, service: service.id } });
                  refetchOfficeData();
                }}
              >
                Add
              </Button>
            )}
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

function officeHasService(servideId: number, officeData: OfficeData): boolean {
  return officeData.office.services.map((data) => data.id).some((id) => id === servideId);
}

export default Services;

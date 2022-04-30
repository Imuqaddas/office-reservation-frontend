/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "@apollo/client";
import { css, SerializedStyles } from "@emotion/react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Layout from "../../components/Layout/Layout";
import { RENTING, Data as RentingDataType } from "./gql/rentingQuery";
import { RENTING_PAYMENTS, Data as RentingPricesData } from "./gql/rentingPaymentsQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { CREATE_RENTING_STATE_CHANGE } from "./gql/createRentingStateChangeMutations";
import { RENTING_STATES, Data as RentingStates } from "./gql/rentingStatesQuery";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { CreditCard, CreditScore } from "@mui/icons-material";
import { PAY } from "./gql/payMutation";
import OpenInNew from "@mui/icons-material/OpenInNew";

function RentingData() {
  const { id } = useParams();
  const parseId = parseInt(id as string, 10);
  const { data: rentingData, refetch } = useQuery<RentingDataType>(RENTING, { variables: { id: parseId } });
  const { data: rentingPaymentsData, refetch: refetchPayment } = useQuery<RentingPricesData>(RENTING_PAYMENTS, { variables: { renting: parseId } });

  return (
    <Layout>
      <Typography variant="h4">Renting #{id}</Typography>
      <BasicData rentingData={rentingData}></BasicData>
      <StateChanges state_changes={rentingData?.renting.state_changes} renting={parseId} refetchStateChanges={refetch}></StateChanges>
      <Payments payments={rentingPaymentsData} refetchPayments={refetchPayment}></Payments>
    </Layout>
  );
}

function BasicData(props: { rentingData: RentingDataType | undefined }) {
  const navigate = useNavigate();
  return (
    <div css={sectionStyles}>
      <Typography variant="h5" css={subtitleStyles}>
        Basic data
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant="head">ID</TableCell>
              <TableCell>{props.rentingData?.renting.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Office</TableCell>
              <TableCell>
                {props.rentingData?.renting.office.building.name} {props.rentingData?.renting.office.office_number}
                <Tooltip title="Open">
                  <IconButton color="primary" aria-label="open" component="span" onClick={() => navigate(`/office/${props.rentingData?.renting.office.id}`)}>
                    <OpenInNew />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Customer name</TableCell>
              <TableCell>{`${props.rentingData?.renting.user.firstname} ${props.rentingData?.renting.user.lastname}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Customer email</TableCell>
              <TableCell>{props.rentingData?.renting.user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Customer phone</TableCell>
              <TableCell>{props.rentingData?.renting.user.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Duration</TableCell>
              <TableCell>{props.rentingData?.renting.months} months</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Start of renting</TableCell>
              <TableCell>{formatDate(props.rentingData?.renting.start, true)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">End of renting</TableCell>
              <TableCell>{formatDate(props.rentingData?.renting.end, true)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Created at</TableCell>
              <TableCell>{formatDate(props.rentingData?.renting.created_at)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function formatDate(timeStamp?: string, ignoreTime = false): string {
  return timeStamp ? (ignoreTime ? new Date(parseInt(timeStamp, 10)).toLocaleDateString("hu-HU") : new Date(parseInt(timeStamp, 10)).toLocaleString("hu-HU")) : "";
}

function StateChanges(props: { state_changes?: RentingDataType["renting"]["state_changes"]; renting: number; refetchStateChanges: () => Promise<any> }) {
  const [create, setCreate] = useState(false);
  const [newRentingState, setNewRentingState] = useState(1);
  const { data: rentingStates } = useQuery<RentingStates>(RENTING_STATES);
  const [createRentingStateChange] = useMutation(CREATE_RENTING_STATE_CHANGE);

  return (
    <div css={sectionStyles}>
      <Typography variant="h5" css={subtitleStyles}>
        State changes
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.state_changes?.map((state_change) => (
              <TableRow key={state_change.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>#{state_change.id}</TableCell>
                <TableCell>{state_change.state.name}</TableCell>
                <TableCell>{state_change.state.description}</TableCell>
                <TableCell>{formatDate(state_change.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {create && (
        <Box>
          <Typography variant="h6" css={subtitleStyles}>
            New state
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="building-input">Floor</InputLabel>
            <Select
              labelId="building-input-label"
              id="building-input"
              label="Renting state"
              value={newRentingState}
              onChange={(event) => setNewRentingState(parseInt(event.target.value as string, 10))}
            >
              {rentingStates?.rentingStates.map((state) => (
                <MenuItem value={state.id} key={state.id}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "20px",
        }}
      >
        {create && (
          <Button
            variant="contained"
            color="success"
            sx={{ marginRight: "10px" }}
            onClick={async () => {
              await createRentingStateChange({ variables: { renting: props.renting, state: newRentingState, created_at: new Date().toISOString() } });
              await props.refetchStateChanges();
              setCreate(false);
            }}
          >
            Save
          </Button>
        )}
        <Button variant="contained" color={create ? "warning" : "success"} onClick={() => setCreate(!create)}>
          {create ? "Cancel" : "Create"}
        </Button>
      </Box>
    </div>
  );
}

function Payments(props: { payments?: RentingPricesData; refetchPayments: () => Promise<any> }) {
  const [pay] = useMutation(PAY);

  const setToPayed = async (id: number) => {
    await pay({ variables: { id, date: new Date().toISOString() } });
    props.refetchPayments();
  };

  return (
    <div css={sectionStyles}>
      <Typography variant="h5" css={subtitleStyles}>
        Payments
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gross price</TableCell>
              <TableCell>Payment method</TableCell>
              <TableCell>Billing name</TableCell>
              <TableCell>Billing address</TableCell>
              <TableCell>Due date</TableCell>
              <TableCell>Payment date</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.payments?.payments.map((payment) => (
              <TableRow key={payment.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>#{payment.id}</TableCell>
                <TableCell>{payment.name}</TableCell>
                <TableCell>{payment.gross_amount}</TableCell>
                <TableCell>{payment.payment_method.name}</TableCell>
                <TableCell>{payment.billing_data.billing_name}</TableCell>
                <TableCell>{payment.billing_data.billing_address}</TableCell>
                <TableCell>{formatDate(payment.due_date, true)}</TableCell>
                <TableCell>{payment.paid_at ? formatDate(payment.paid_at, true) : "Unpaid"}</TableCell>
                <TableCell>{formatDate(payment.created_at)}</TableCell>
                <TableCell>
                  <Tooltip title={payment.paid_at ? "Paid" : "Pay"}>
                    <IconButton
                      color={payment.paid_at ? "success" : "primary"}
                      onClick={async () => {
                        if (payment.paid_at === null) {
                          await setToPayed(payment.id);
                        }
                      }}
                    >
                      {payment.paid_at ? <CreditScore /> : <CreditCard />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const sectionStyles: SerializedStyles = css`
  margin-top: 20px;
`;

const subtitleStyles: SerializedStyles = css`
  margin-bottom: 10px;
`;

export default RentingData;

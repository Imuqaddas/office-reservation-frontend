/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import StepThreeProps from "./StepThreeProps";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_OFFICE_PRICING } from "../gql/createOfficePricingMutation";
import { useNavigate } from "react-router-dom";

function StepThree(props: StepThreeProps) {
  const [hourlyRate, setHourlyRate] = useState<number>();
  const [dailyRate, setDailyRate] = useState<number>();
  const [monthlyRate, setMonthlyRate] = useState<number>();
  const [hourlyRateSaved, setHourlyRateSaved] = useState(false);
  const [dailyRateSaved, setDailyRateSaved] = useState(false);
  const [monthlyRateSaved, setMonthlyRateSaved] = useState(false);

  const [createOfficePricing] = useMutation(CREATE_OFFICE_PRICING);
  const navigate = useNavigate();

  const savePrice = async (type: 1 | 2 | 3) => {
    let price: number | undefined;

    switch (type) {
      case 1:
        setHourlyRateSaved(true);
        price = hourlyRate;
        break;
      case 2:
        setDailyRateSaved(true);
        price = dailyRate;
        break;
      case 3:
        setMonthlyRateSaved(true);
        price = monthlyRate;
        break;
    }

    await createOfficePricing({ variables: { office: props.officeId, time_unit: type, unit_price: price, created_at: new Date().toISOString() } });
  };

  return (
    <>
      <Typography
        variant="h5"
        css={css`
          margin-top: 15px;
        `}
      >
        Prices
      </Typography>

      <Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Time unit</TableCell>
                <TableCell>Unit price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>Hourly</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <OutlinedInput
                      value={hourlyRate}
                      onChange={(event) => setHourlyRate(parseFloat(event.target.value))}
                      type="number"
                      endAdornment={<InputAdornment position="end">HUF</InputAdornment>}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button color="success" variant="contained" size="small" onClick={() => savePrice(1)} disabled={hourlyRateSaved}>
                    Save
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>Daily</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <OutlinedInput
                      value={dailyRate}
                      onChange={(event) => setDailyRate(parseFloat(event.target.value))}
                      type="number"
                      endAdornment={<InputAdornment position="end">HUF</InputAdornment>}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button color="success" variant="contained" size="small" onClick={() => savePrice(2)} disabled={dailyRateSaved}>
                    Save
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>Monthly</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <OutlinedInput
                      value={monthlyRate}
                      onChange={(event) => setMonthlyRate(parseFloat(event.target.value))}
                      type="number"
                      endAdornment={<InputAdornment position="end">HUF</InputAdornment>}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button color="success" variant="contained" size="small" onClick={() => savePrice(3)} disabled={monthlyRateSaved}>
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "20px",
        }}
      >
        <Button onClick={() => navigate(`/office/${props.officeId}`)} disabled={!hourlyRateSaved || !dailyRateSaved || !monthlyRateSaved}>
          Finish
        </Button>
      </Box>
    </>
  );
}

export default StepThree;

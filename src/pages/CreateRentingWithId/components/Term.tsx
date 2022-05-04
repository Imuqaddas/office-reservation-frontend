/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

function Term(props: { onDatesChange: (start: string, months: string, end: string) => void }) {
  const [start, setStart] = useState(new Date().toISOString());
  const [end, setEnd] = useState("");
  const [length, setLength] = useState("0");

  useEffect(() => {
    const s = new Date(start);
    const e = new Date(s);
    e.setDate(e.getDate() + parseInt(length, 10));

    const e2 = e.toISOString().split("T")[0];
    setEnd(e2);

    props.onDatesChange(start, length, e2);
  }, [start, length, props]);

  return (
    <Box>
      <Typography variant="h5" css={headerStyle}>
        Term
      </Typography>
      <Box sx={{ backgroundColor: "white", padding: "15px" }}>
        <TextField
          value={start}
          label="Starting time"
          type="date"
          onChange={(event) => setStart(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <FormControl css={inputStyle} fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Length</InputLabel>
          <OutlinedInput endAdornment={<InputAdornment position="end">month</InputAdornment>} type="number" label="Length" value={length} onChange={(event) => setLength(event.target.value)} />
        </FormControl>
        <TextField
          label="End time"
          type="date"
          value={end}
          InputLabelProps={{
            shrink: true,
          }}
          disabled
          fullWidth
        />
      </Box>
    </Box>
  );
}

const headerStyle = css`
  margin: 10px 0;
`;

const inputStyle = css`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export default Term;

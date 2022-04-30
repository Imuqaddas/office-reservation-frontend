import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TableCell from "@mui/material/TableCell";
import MenuItem from "@mui/material/MenuItem";

import SelectorProps from "./SelectorProps";

function Selector(props: SelectorProps) {
  const [newPieces, setNewPieces] = useState(props.pieces || 1);
  return (
    <>
      <TableCell>
        <FormControl fullWidth>
          <Select value={newPieces} labelId="building-input-label" id="building-input" onChange={(event) => setNewPieces(event.target.value as number)}>
            {Array.from({ length: 9 }, (x, i) => i).map((floor: number) => (
              <MenuItem value={floor + 1} key={floor + 1}>
                {floor + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          {props.pieces !== undefined ? (
            <Button color="error" variant="outlined" size="small" onClick={props.onDelete}>
              Delete
            </Button>
          ) : (
            <Button color="primary" variant="contained" size="small" onClick={() => props.onCreate && props.onCreate(newPieces)}>
              Add
            </Button>
          )}

          {props.pieces !== undefined && props.pieces !== newPieces && (
            <Button color="secondary" variant="contained" size="small" onClick={() => props.onUpdate && props.onUpdate(newPieces)}>
              Update
            </Button>
          )}
        </Box>
      </TableCell>
    </>
  );
}

export default Selector;

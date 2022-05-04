/** @jsxImportSource @emotion/react */
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { USERS, Data as UsersData, User } from "../gql/usersQuery";

function SearchUser(props: { onUserChange: (id: number) => void }) {
  const [open, setOpen] = useState(false);
  const { data: usersData, loading } = useQuery<UsersData>(USERS);

  return (
    <Box sx={{ backgroundColor: "white", padding: "15px" }}>
      <Autocomplete
        sx={{ marginTop: "15px" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, newValue) => {
          if (newValue !== null) props.onUserChange(newValue.id);
        }}
        isOptionEqualToValue={(option: User, value: User) => option.id === value.id}
        getOptionLabel={(option: User) => `#${option.id} - ${option.firstname} ${option.lastname} - ${option.email}`}
        options={usersData?.users ?? []}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Users"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        fullWidth
      />
      <Typography variant="body2" css={hintStyle}>
        If the user doesn't exist, please create it on the "CREATE USER" tab.
      </Typography>
    </Box>
  );
}

const hintStyle = css`
  margin-top: 15px;
`;

export default SearchUser;

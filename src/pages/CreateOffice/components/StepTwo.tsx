import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Items from "./Items";

import Services from "./Services";
import StepTwoProps from "./StepTwoProps";

function StepTwo(props: StepTwoProps) {
  return (
    <>
      <Services officeId={props.officeId} />
      <Items officeId={props.officeId} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "20px",
        }}
      >
        <Button onClick={props.onNext}>Next</Button>
      </Box>
    </>
  );
}

export default StepTwo;

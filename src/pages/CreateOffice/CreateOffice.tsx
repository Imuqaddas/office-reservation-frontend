/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Typography from "@mui/material/Typography";

import Layout from "../../components/Layout/Layout";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import { useState } from "react";
import StepThree from "./components/StepThree";

function CreateOffice() {
  const [step, setStep] = useState<number>(1);
  const [officeId, setOfficeId] = useState<number>();

  return (
    <Layout>
      <Typography variant="h4">Create office</Typography>
      <Stepper activeStep={step - 1} css={stepperStyle}>
        <Step key="Basic data">
          <StepLabel>Basic data</StepLabel>
        </Step>
        <Step key="Items and services">
          <StepLabel>Items and services</StepLabel>
        </Step>
        <Step key="Pricing">
          <StepLabel>Pricing</StepLabel>
        </Step>
      </Stepper>
      {step === 1 && (
        <StepOne
          onOfficeCreate={(id: number) => {
            setOfficeId(id);
            setStep(step + 1);
          }}
        ></StepOne>
      )}
      {step === 2 && <StepTwo officeId={officeId as number} onNext={() => setStep(step + 1)}></StepTwo>}
      {step === 3 && <StepThree officeId={officeId as number}></StepThree>}
    </Layout>
  );
}

const stepperStyle = css`
  margin-top: 20px;
`;

export default CreateOffice;

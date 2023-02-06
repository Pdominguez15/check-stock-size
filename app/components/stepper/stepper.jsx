"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getValidations } from "@/helpers/index";

import { StyledEngineProvider, Stepper, Button } from "@mui/material";

import { getSteps, handleSteps } from "./utils";
import CustomStep from "./components/customStep";

import styles from "./stepper.module.css";

export default function CustomStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const [models, setModels] = useState([]);

  const [response, setResponse] = useState({
    isOk: false,
    message: "",
  });

  const {
    handleSubmit: onSubmit,
    getValues,
    control,
    trigger,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(getValidations()),
  });

  const steps = getSteps(models, getValues, control, errors);

  const { handleNext, handleBack, handleReset, handleSubmit } = handleSteps(
    activeStep,
    trigger,
    setModels,
    setActiveStep,
    getValues,
    setError,
    reset,
    models,
    setResponse
  );

  return (
    <StyledEngineProvider injectFirst>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <CustomStep
              key={step.id}
              step={step}
              length={steps.length}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          ))}
        </Stepper>
      </form>
      {activeStep === steps.length && (
        <div className={styles.containerButtons}>
          <p className={response.isOk ? styles.ok : styles.ko}>
            {response.message}
          </p>
          {response.isOk ? (
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Agregar otro producto
            </Button>
          ) : (
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Atrás
            </Button>
          )}
        </div>
      )}
    </StyledEngineProvider>
  );
}

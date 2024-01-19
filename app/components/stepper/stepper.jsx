"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getValidations } from "@/helpers/index";

import { Stepper, Button } from "@mui/material";

import { StyledEngineProvider } from "@mui/material/styles";

import { getSteps, handleSteps } from "@/app/components/stepper/utils";
import CustomStep from "@/app/components/stepper/components/customStep";

import styles from "@/app/components/stepper/stepper.module.css";

export default function CustomStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [productInfo, setProductInfo] = useState({
    product: [],
    productUrl: "",
  });

  const [alertStatus, setAlertStatus] = useState({
    isOk: false,
    message: "",
  });

  const {
    handleSubmit: onSubmit,
    getValues: getFormValues,
    control,
    trigger,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(getValidations()),
  });

  const steps = getSteps(productInfo, getFormValues, control, errors);

  const { handleNext, handleBack, handleReset, handleSubmit } = handleSteps(
    activeStep,
    trigger,
    setProductInfo,
    setActiveStep,
    getFormValues,
    setError,
    reset,
    productInfo,
    setAlertStatus
  );

  return (
    <StyledEngineProvider injectFirst>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step) => (
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
        <div className={styles.buttonsContainer}>
          <p className={alertStatus.isOk ? styles.ok : styles.ko}>
            {alertStatus.message}
          </p>
          {alertStatus.isOk ? (
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

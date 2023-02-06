import { Step, StepLabel, StepContent, Button } from "@mui/material";

import styles from "./customStep.module.css";

export default function CustomStep({
  step,
  length,
  handleNext,
  handleBack,
  ...other
}) {
  return (
    <Step {...other}>
      <StepLabel className={styles.stepLabel}>{step.label}</StepLabel>
      <StepContent>
        {step.component}
        <div className={styles.containerButtons}>
          <Button
            type={step.id === length - 1 ? "submit" : "button"}
            variant="contained"
            onClick={
              step.id === length - 1
                ? null
                : async function () {
                    await handleNext();
                  }
            }
            sx={{ mt: 1, mr: 1 }}
          >
            {step.id === length - 1 ? "Enviar alerta" : "Avanzar"}
          </Button>
          <Button
            disabled={step.id === 0}
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            Atrás
          </Button>
        </div>
      </StepContent>
    </Step>
  );
}

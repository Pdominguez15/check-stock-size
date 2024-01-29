import { Step, StepLabel, StepContent, Button } from "@mui/material";

import styles from "@/app/components/stepper/components/customStep.module.css";

export default function CustomStep({
  step,
  length,
  handleNext,
  handleBack,
  ...other
}) {
  return (
    <Step {...other} className={styles.step}>
      <StepLabel className={styles.label}>{step.label}</StepLabel>
      <StepContent className={styles.content}>
        {step.component}
        <div className={styles.buttonsContainer}>
          <Button
            disabled={step.id === 0}
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            Atrás
          </Button>
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
        </div>
      </StepContent>
    </Step>
  );
}

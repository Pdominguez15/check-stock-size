import { getUrlWithColor, checkStep } from "@/helpers/index";
import { sendData } from "@/helpers/api";

export const handleSteps = (
  activeStep,
  trigger,
  setModels,
  setActiveStep,
  getValues,
  setError,
  reset,
  models,
  setResponse
) => {
  const handleNext = async () => {
    const isStepValid = await checkStep(
      activeStep,
      trigger,
      getValues,
      setError,
      setModels
    );
    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    reset();
    setModels([]);
    setActiveStep(0);
  };

  const handleSubmit = async (data) => {
    // if (getValues("notification") === "email") {
    //   if (!getValues("email")) {
    //     setError("email", {
    //       type: "manual",
    //       message: "El correo es obligatorio",
    //     });
    //     return;
    //   }
    // } else {
    //   if (!getValues("idChatTelegram")) {
    //     setError("idChatTelegram", {
    //       type: "manual",
    //       message: "El idChatTelegram es obligatorio",
    //     });
    //     return;
    //   }
    // }

    trigger("email");

    const newData = {
      url: getUrlWithColor(data.url.replace("ES", "es"), data.color),
      size: data.size,
      store: models[0].store,
      name: models[0].name,
      // notification:
      //   data.notification === "email" ? data.email : data.idChatTelegram,
      notification: data.email,
    };

    const isOk = await sendData(newData);

    if (isOk) {
      setResponse({
        isOk: true,
        message: "La alerta ha sido añadida correctamente.",
      });
    } else {
      setResponse({
        isOk: false,
        message: "Error al añadir la alerta, inténtelo de nuevo.",
      });
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return { handleNext, handleBack, handleReset, handleSubmit };
};

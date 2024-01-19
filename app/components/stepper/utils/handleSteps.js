import { getUrlWithColor, checkStep } from "@/helpers/index";
import { sendData } from "@/helpers/api";

export const handleSteps = (
  activeStep,
  trigger,
  setProductInfo,
  setActiveStep,
  getFormValues,
  setError,
  reset,
  productInfo,
  setAlertStatus
) => {
  const handleNext = async () => {
    const isStepValid = await checkStep(
      activeStep,
      trigger,
      getFormValues,
      setError,
      setProductInfo
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
    setProductInfo({
      product: [],
      productUrl: "",
    });
    setActiveStep(0);
  };

  const handleSubmit = async (formData, productInfo) => {
    // if (getFormValues("notification") === "email") {
    //   if (!getFormValues("email")) {
    //     setError("email", {
    //       type: "manual",
    //       message: "El correo es obligatorio",
    //     });
    //     return;
    //   }
    // } else {
    //   if (!getFormValues("idChatTelegram")) {
    //     setError("idChatTelegram", {
    //       type: "manual",
    //       message: "El idChatTelegram es obligatorio",
    //     });
    //     return;
    //   }
    // }

    trigger("email");

    const newproductInfo = {
      url: productInfo?.productUrl,
      size: formData.size,
      store: productInfo?.product[0].store,
      name: productInfo?.product[0].name,
      // notification:
      //   productInfo.notification === "email" ? productInfo.email : productInfo.idChatTelegram,
      notification: formData.email,
    };

    const isOk = await sendData(newproductInfo);

    if (isOk) {
      setAlertStatus({
        isOk: true,
        message: "La alerta ha sido añadida correctamente.",
      });
    } else {
      setAlertStatus({
        isOk: false,
        message: "Error al añadir la alerta, inténtelo de nuevo.",
      });
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return { handleNext, handleBack, handleReset, handleSubmit };
};

import { getData } from "./api";

export const checkStep = async (
  step,
  trigger,
  getValues,
  setError,
  setModels
) => {
  if (step === 0) {
    const isUrlValid = await trigger("url");
    if (isUrlValid) {
      const models = await getData(getValues("url").replace("ES", "es"));

      if (models) {
        setModels(models);
        return true;
      } else {
        setError("url", {
          type: "manual",
          message: "No se encontró el producto",
        });
      }
    }
  }

  if (step === 1) {
    const isColorValid = await trigger("color");
    if (isColorValid) {
      return true;
    }
  }
  if (step === 2) {
    const isSizeValid = await trigger("size");
    if (isSizeValid) {
      return true;
    }
  }
  if (step === 3) {
    const isNotificationValid = await trigger("notification");
    if (isNotificationValid) {
      return true;
    }
  }
  return false;
};

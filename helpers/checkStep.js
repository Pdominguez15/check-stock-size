import { getProductInfo } from "./api";

export const checkStep = async (
  step,
  trigger,
  getFormValues,
  setError,
  setProductInfo
) => {
  if (step === 0) {
    const isUrlValid = await trigger("url");
    if (isUrlValid) {
      const productInfo = await getProductInfo(
        getFormValues("url").replace("ES", "es")
      );

      if (productInfo) {
        setProductInfo(productInfo);
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

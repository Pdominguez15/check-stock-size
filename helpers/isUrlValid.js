import { isStradivariusUrl } from "helpers/isStradivariusUrl";
import { isZaraUrl } from "helpers/isZaraUrl";

export const isUrlValid = (url) => {
  return isZaraUrl(url) || isStradivariusUrl(url);
};

import { isStradivariusUrl } from "helpers/isStradivariusUrl";
import { isZaraUrl } from "helpers/isZaraUrl";

export const getUrlWithColor = (url, color) => {
  const newurl = new URL(url);
  const search_params = newurl.searchParams;

  if (isStradivariusUrl(url)) {
    search_params.set("colorId", color);
  } else if (isZaraUrl(url)) {
    search_params.set("v1", color);
  }

  newurl.search = search_params.toString();

  return newurl.toString();
};

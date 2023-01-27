import { scrapingStradivarius } from "scraping/scrapingStradivarius";
import { scrappingZara } from "scraping/scrapingZara";
import { isStradivariusUrl } from "helpers/isStradivariusUrl";
import { isZaraUrl } from "helpers/isZaraUrl";

export const getData = (url) => {
  if (isZaraUrl(url)) {
    return scrappingZara(url);
  } else if (isStradivariusUrl(url)) {
    return scrapingStradivarius(url);
  }
};

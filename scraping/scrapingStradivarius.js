import { scrape } from "helpers/scrape";

const getUrlApi = (url) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const element = urlParams.get("pelement");
  const urlApi = `https://www.stradivarius.com/itxrest/2/catalog/store/54009550/50331075/category/0/product/${element}/detail?languageId=-5&appId=1`;

  return urlApi;
};

const mapperStradivarius = (data) => {
  return data.map((product) => {
    return {
      color: product.name,
      id: product.id,
      sizes: [...new Set(product.sizes.map((size) => size.name))],
    };
  });
};

export const scrapingStradivarius = async (url) => {
  const urlApi = getUrlApi(url);
  const json = await scrape(urlApi);
  const detail = json.detail.colors;

  return mapperStradivarius(detail);
};

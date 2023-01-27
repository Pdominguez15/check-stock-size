import { scrape } from "helpers/scrape";

const getUrlApi = (url) => {
  const urlApi = `${url}&ajax=true`;

  return urlApi;
};

const mapperZara = (data) => {
  return data.map((product) => {
    return {
      color: product.name,
      id: product.productId.toString(),
      sizes: [...new Set(product.sizes.map((size) => size.name))],
    };
  });
};

export const scrappingZara = async (url) => {
  const urlApi = getUrlApi(url);
  const json = await scrape(urlApi);
  const detail = json.product.detail.colors;

  return mapperZara(detail);
};

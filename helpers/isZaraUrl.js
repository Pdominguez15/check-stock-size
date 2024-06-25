export const isZaraUrl = (url) => {
  const regexZara = new RegExp(/https:\/\/www.zara.com\//);

  return regexZara.test(url);
};

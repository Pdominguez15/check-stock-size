export const isBershkaUrl = (url) => {
  const regexBershka = new RegExp(/https:\/\/www.bershka.com\//);

  return regexBershka.test(url);
};

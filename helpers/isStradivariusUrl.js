export const isStradivariusUrl = (url) => {
  const regexStradivarius = new RegExp(/https:\/\/www.stradivarius.com\//);

  return regexStradivarius.test(url);
};

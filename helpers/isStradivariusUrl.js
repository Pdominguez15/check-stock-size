export const isStradivariusUrl = (url) => {
  const regexStradivarius = new RegExp(
    /https:\/\/www.stradivarius.com\/[eE][sS]\//
  );

  return regexStradivarius.test(url);
};

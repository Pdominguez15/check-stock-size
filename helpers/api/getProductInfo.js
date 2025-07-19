export const getProductInfo = async (url) => {
  const response = await fetch("api/v2/productInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (response.ok) {
    const productInfo = await response.json();
    return productInfo;
  }
  return null;
};

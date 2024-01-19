export const sendData = async (data) => {
  const response = await fetch("api/v2/saveProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  });

  return response.ok;
};

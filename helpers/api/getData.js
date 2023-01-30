export const getData = async (url) => {
  const response = await fetch("api/getData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (response.ok) {
    const model = await response.json();
    return model;
  }
  return null;
};

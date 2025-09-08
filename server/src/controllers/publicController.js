export async function getData(req, res) {
  const env = req.env;

  const filteredData = Object.fromEntries(
    [...env.data.entries()]
      .filter(([_, val]) => val.status === "active")   
      .map(([key, val]) => [key, val.value])
  );

  res.json({
    ...filteredData
  });
}

 
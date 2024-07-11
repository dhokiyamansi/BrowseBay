import axios from "axios";

const baseURL = `${import.meta.env.VITE_SERVER_ADDRESS}/api/`;

export const requestHandler = async ({
  method = "GET",
  url,
  data = {},
  headers = {},
  params = {},
}) => {
  // console.log("REQ HAND: ", method, url, data, headers, params);
  const response = await axios({
    method,
    baseURL,
    url,
    data,
    headers,
    params,
  });
  return response.data;
};

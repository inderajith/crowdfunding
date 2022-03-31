const axios = require("axios").default;
const BASE_URL = "http://localhost:3001";

axios.defaults.baseURL = BASE_URL;
 
export const api_call = async ({
  apiUrl = "/",
  body = {},
  method = "get",
  isTokenRequired = false,
}) => {
  try {
    const config = {
      method,
      url: apiUrl,
      [method === "get" ? "params" : "data"]: body,
      timeout: 4000,
    };

    if (isTokenRequired) {
      // const { token } = JSON.parse(user);
      //   axios.defaults.headers.Authorization = `Bearer ${token}`;
    }

    console.log(config);
    const response = await axios(config);
    console.log(response.status, response.data);
    return {
      responseData: response?.data,
      statusCode: response.status.toString().startsWith("2")
        ? SUCCESS_CODE
        : response.status,
    };
  } catch (err) {
    console.log("Error :", err?.response?.status, err?.response?.data);
    return {
      responseData: err?.response?.data,
      statusCode: err?.response?.status,
    };
  }
};

export const SUCCESS_CODE = 200;

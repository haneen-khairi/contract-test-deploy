const axios = require("axios"); // Import Axios library

export async function CustomAxios(
  requestType: string,
  url: string,
  headers = {},
  requestBody: any = null
) {
  try {
    // Create Axios config object with the request type, URL, headers, and request body
    const config = {
      method: requestType,
      url,
      headers,
      data: requestBody, // Include the request body for POST requests
    };
    const response = await axios(config);

    return response.data;
  } catch (error) {
    return error;
  }
}
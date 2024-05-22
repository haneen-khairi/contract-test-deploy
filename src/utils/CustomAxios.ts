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
    // console.log("request typee", requestType )
    // // Make the HTTP request using Axios
    // console.log("==== headers ====",headers)
    // console.log("==== requestBody ===",requestBody)
    const response = await axios(config);

    // console.log('header')
    // console.log("=== response ====",response)
    // console.log('header')
    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors if provided errorHandler function is defined

    return error;
  }
}
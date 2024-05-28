import axios from 'axios';
import { toast } from 'react-toastify';
// initializing the axios instance with custom configs\
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmZTAwMDAwMC0yMDEwLTIwMTAtMjAxMC0wMDAwMDAwMDAwMDEiLCJ1bmlxdWVfbmFtZSI6InNvbmRuIiwiZW1haWwiOiJzb25kbjIwMTBAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwOTg4ODY2Njg4NyIsIngtdXNlck5hbWUiOiJzb25kbiIsIngtZnVsbE5hbWUiOiLEkOG7lyBOYW0gU8ahbiIsIngtdXNlcklkIjoiZmUwMDAwMDAtMjAxMC0yMDEwLTIwMTAtMDAwMDAwMDAwMDAxIiwieC1hcHBJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsInMtc3VwZXJ1c2VyIjpbIlRydWUiLCJUcnVlIl0sIngtZ3JvdXB0eXBlIjoiIiwieC11c2VydHlwZSI6IjAiLCJ4LXBob25lbnVtYmVyIjpbIjA5ODg4NjY2ODg3IiwiMDk4ODg2NjY4ODciXSwieC1hdmF0YXIiOiJodHRwOi8vZGV2LmJraG9sZGluZy52bjo5MDQ2L3VzZXItYmxvYi83MzZkNjE3Mi03NDJkLTc0NzItNjE2My02NTAwMDAwMDAwMDAvMjAyMy8wOC8yOS9hZG1pbi5wbmciLCJyb2xlIjpbImFwaS10ZXN0IiwiYXBpLXRlc3QtMSJdLCJ4LXJvbGUiOiJbXCJhcGktdGVzdFwiLFwiYXBpLXRlc3QtMVwiXSIsIngtcmlnaHQiOiJbXCJBNDAzXCIsXCJBNDA1XCIsXCJBMTAxXCIsXCJBNDAyXCIsXCJBMzAyXCIsXCJBMDAyXCIsXCJBMDA1XCIsXCJBMDAxXCIsXCJBMzA0XCIsXCIzMDAxXCIsXCJBMTA0XCIsXCJBMzA3XCIsXCJBNDA2XCIsXCJBNDA0XCIsXCJBNDAxXCIsXCJBMzAxXCIsXCJBMzAzXCIsXCIzMDA3XCIsXCJBMTAyXCIsXCJBMTAzXCIsXCJBMDA0XCIsXCJBMDAzXCIsXCIzMDA1XCJdIiwieC1leHAiOiIxNzE2OTY5NDY1NDQ5IiwieC1pYXQiOiIxNzE2ODgzMDY1NDQ5IiwibmJmIjoxNzE2ODgzMDY1LCJleHAiOjE3MTY5Njk0NjUsImlhdCI6MTcxNjg4MzA2NSwiaXNzIjoiUy1FUlAiLCJhdWQiOiJTLUVSUCJ9.ZfiA0KhIa0XpEOnL46mmVLlVknifmm-UoS1hkqvC6V8'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + 'v1',
  headers: { Authorization: `Bearer ${token}` }
});

// defining a custom error handler for all APIs
const errorHandler = async (error: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: { status: any; data: { message: any }; statusText: string };
}) => {
  const statusCodes = [400, 401, 409, 406, 500];
  const statusCode = error.response?.status;
  try {
    // logging only errors that are not 401
    if (statusCode && statusCode !== 401) {
      console.error(
        `axiosConfig.ts:: errorHandler:: message: ${JSON.stringify(
          error.response?.data?.message
        )} code: ${statusCode}`
      );
    }

    if (statusCodes.includes(statusCode)) {
      console.log(
        'Message error: ',
        JSON.stringify(error.response?.data?.message)
      );
      toast.error(JSON.stringify(error.response?.data?.message[0]), {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    return Promise.reject(error.response?.data?.message || error);
  } catch (error) {
    return Promise.reject(error);
  }
};

// registering the custom error handler to the "api" axios instance
api.interceptors.response.use(undefined, (error) => errorHandler(error));

export default api;

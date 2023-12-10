import axios from 'axios';
import { toast } from 'react-toastify';
// initializing the axios instance with custom configs\
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
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

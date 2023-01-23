import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { PaginatedResponse } from '../models/pagination';
import { store } from '../store/configureStore';
import { logDebug, logErrors } from '../util/general';
import textConstants from '../util/textConstants';
import { redirect } from 'react-router-dom';

// This function is used to delay the response by one second when running the app locally.
// This is used to simulate a real-time application.
const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

// Get the API URL for the current environment.
const API_URL = process.env.REACT_APP_API_URL;

// Print the API URL to the console if logging is enabled.
logDebug('Environment process API URL', API_URL);

// Set the base URL for Axios requests.
axios.defaults.baseURL = API_URL;

// Include credentials (such as cookies) in all Axios requests by default.
axios.defaults.withCredentials = true;

// This function reads the data from an Axios response and returns the response body.
const responseBody = (response: AxiosResponse) => response.data;

// This function is a request interceptor for Axios. It is called before every request and
// sets the authorization headers by adding a bearer token to the request if one is available.
axios.interceptors.request.use((config: any) => {
  // logDebug('Intercept request config', config);
  const token = store.getState().user.user?.idToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// This function is a response interceptor for Axios. It is called after every response and
// handles errors, adds pagination data to the response if it is available, and delays the
// response if the app is running locally.
axios.interceptors.response.use(
  async response => {
    // Delay the response by one second if the app is running locally.
    if (process.env.NODE_ENV === 'development') await sleep();
    // Get the pagination data from the response headers.
    const pagination = response.headers['pagination'];
    if (pagination) {
      // If there is pagination data, add it to the response data.
      const metaData = JSON.parse(pagination);
      // logDebug('Restructure pagination response', response);
      response.data = new PaginatedResponse(response.data, metaData);
      return response;
    }
    return response;
  },
  (error: any) => {
    // Handle errors in the response.
    // Get the error data and message.
    const { data } = error.response;
    const { message, statusCode: status } = data;
    switch (status) {
      case 400:
        if (data.errors) {
          // If there are model state errors, flatten them into an array.
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.error[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(message);
        break;
      case 401:
        toast.error(message);
        break;
      case 403:
        toast.error('You are not allowed to do that!');
        break;
      case 500:
        // TODO redirect to error page.
        // const navigate = useNavigate();
        redirect('/serverError', data);
        toast.error(message);
        break;

      default:
        break;
    }
    logErrors(error.response);
    return Promise.reject(error.response);
  }
);

// This object contains functions for making HTTP requests using Axios.
// The functions correspond to HTTP verbs (e.g. GET, POST, PUT, DELETE) and accept a URL and optional parameters.
// The functions return a Promise that resolves to the response body.
const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params}).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  // This function is used to make a POST request with form data (e.g. for file uploads).
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
  // This function is used to make a PUT request with form data (e.g. for file uploads).
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
};

// This object contains functions for making API requests related to farms.
// The functions accept optional parameters and return a Promise that resolves to the response body.
const Farm = {
  // This function makes a GET request to the "Farms
  list: (params: URLSearchParams) => requests.get('Farms', params), // TODO use text constant
  details: (id: string) => requests.get(`Farms/${id}`),
};

// Implement business requests
const Business = {
  // retrieve a list of businesses with optional query parameters
  list: (params: URLSearchParams) => requests.get('Businesses', params), // TODO use text constant
  // retrieve details of a specific business by its id
  details: (id: string) => requests.get(`Businesses/${id}`),
};

// Implement Block requests
const Block = {
  // retrieve a list of farm blocks with optional query parameters
  list: (params: URLSearchParams) => requests.get('FarmBlocks', params), // TODO use text constant
  // retrieve details of a specific Block by its id
  details: (id: string) => requests.get(`FarmBlocks/${id}`),
};

// Implement SoilSample requests
const SoilSample = {
  // retrieve a list of soil samples with optional query parameters
  list: (params: URLSearchParams) => requests.get('SoilSamples', params), // TODO use text constant
  // retrieve details of a specific soil sample by its id
  details: (id: string) => requests.get(`SoilSamples/${id}`),
  createSoilSamples: (soilSamples: any) => requests.post('SoilSamples/createSoilSamples', soilSamples),
};

// Implement LeafSample requests
const LeafSample = {
  // retrieve a list of leaf samples with optional query parameters
  list: (params: URLSearchParams) => requests.get('LeafSamples', params), // TODO use text constant
  // retrieve details of a specific soil sample by its id
  details: (id: string) => requests.get(`LeafSamples/${id}`),
};

// Implement TestErrors requestso
const TestErrors = {
  get400Error: () => requests.get('testHttpError/bad-request'), // TODO use text constant
  get401Error: () => requests.get('testHttpError/unauthorized'),
  get404Error: () => requests.get('testHttpError/not-found'),
  get500Error: () => requests.get('testHttpError/server-error'),
  getValidationError: () => requests.get('testHttpError/validation-error'),
};

// text constants
const {
  endpoint: { user },
} = textConstants;

// Implement User requests
const User = {
  // log in a user with provided login values
  login: (values: any) => requests.post(user.login, values),
  // log out a user with provided login values
  logout: () => requests.get(user.logout),
  // register a new user with provided values
  register: (values: any) => requests.post(user.register, values),
  // retrieve current user details
  currentUser: () => requests.get(user.currentUser),
  // refresh user token with provided refresh token
  refreshToken: (values: any) => requests.post(user.refreshToken, values),
  forgetPassword: (values: any) => requests.post(user.passwordReset, values),
};

// export all endpoint
const agent = {
  Farm,
  Business,
  Block,
  SoilSample,
  LeafSample,
  TestErrors,
  User,
};

export default agent;

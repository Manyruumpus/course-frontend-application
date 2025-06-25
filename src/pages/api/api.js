import axios from 'axios'; // used to make HTTP requests

export const api = axios.create({ // a new instance of axios is created so evry request has the same base URL
  baseURL: import.meta.env.VITE_API_URL, // or process.env.REACT_APP_API_URL
  withCredentials: true,                // important for JWT cookie
});


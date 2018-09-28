import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:3333/',
  // baseURL: 'https://a8234b46.ngrok.io/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export default server;

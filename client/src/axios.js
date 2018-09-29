import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export default server;

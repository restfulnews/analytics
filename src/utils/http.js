import axios from 'axios';

const http = axios.create({
  baseURL: `${process.env.API_URI}/`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.DODGY_TOKEN}`,
  },
  withCredentials: true,
});

export default http;

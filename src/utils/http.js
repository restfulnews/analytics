import axios from 'axios';
import { getCookie } from './cookie';

// const jwt = getCookie('jwt') ? getCookie('jwt') : process.env.DODGY_TOKEN;

const jwt = getCookie('jwt');

const http = axios.create({
  baseURL: `${process.env.API_URI}/`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  },
  withCredentials: true,
});

export default http;

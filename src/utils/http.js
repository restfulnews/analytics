import axios from 'axios';
import { getCookie } from './cookie';

const http = axios.create({
  baseURL: `${process.env.API_URI}/`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getCookie('jwt')}`,
  },
});

export default http;

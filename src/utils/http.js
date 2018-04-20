import axios from 'axios';
import { getCookie } from './cookie';

export const bearerToken = `Bearer ${getCookie('jwt')}`;

export const http = axios.create({
  baseURL: `${process.env.API_URI}/`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

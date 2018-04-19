import { getCookie } from './cookie';

export const bearerToken = `Bearer ${getCookie('jwt')}`;

export const config = {
  headers: {
    Authorization: bearerToken,
  },
};

import axios, { AxiosRequestConfig, Method } from 'axios';

export const api = (
  url: string,
  method: Method = 'get',
  body: any = undefined,
) =>
  axios({
    url: 'https://nelp.com:8000' + url,
    method,
    data: body,
    withCredentials: true,
  } as AxiosRequestConfig).then(({ data }) => data);

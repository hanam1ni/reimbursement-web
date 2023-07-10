import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({ baseURL: "http://localhost:3001" });

export const get = (url: string, config: AxiosRequestConfig = {}) => {
  return instance.get(url, { withCredentials: true, ...config });
};

export const post = (url: string, body: object | string) =>
  instance.post(url, body, { withCredentials: true });

export const deleteRequest = (url: string) =>
  instance.delete(url, { withCredentials: true });

export const publicPost = (url: string, body: object | string) =>
  instance.post(url, body, { withCredentials: false });

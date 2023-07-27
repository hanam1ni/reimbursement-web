import { PageInfo } from "@/helpers/paginationHelper";
import axios, { AxiosRequestConfig } from "axios";

export interface ListApiResponse<DataType> {
  data: DataType[];
  page: PageInfo;
}

const instance = axios.create({ baseURL: "http://localhost:3001" });

export const get = <ResponseType>(
  url: string,
  config: AxiosRequestConfig = {}
) => {
  return instance.get<ResponseType>(url, { withCredentials: true, ...config });
};

export const post = (url: string, body: object | string) =>
  instance.post(url, body, { withCredentials: true });

export const put = (url: string, body: object | string) =>
  instance.put(url, body, { withCredentials: true });

export const deleteRequest = (url: string) =>
  instance.delete(url, { withCredentials: true });

export const publicPost = (url: string, body: object | string) =>
  instance.post(url, body, { withCredentials: false });

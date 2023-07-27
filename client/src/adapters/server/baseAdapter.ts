import "server-only";

import { PageInfo } from "@/helpers/paginationHelper";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export interface ListApiResponse<DataType> {
  data: DataType;
  page: PageInfo;
}

const instance = axios.create({ baseURL: "http://localhost:3001" });

instance.defaults.withCredentials = true;

export const get = <ResponseType>(
  url: string,
  config: AxiosRequestConfig = {}
) => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("connect.sid")?.value || "";

  const defaultConfig = {
    headers: { Cookie: `connect.sid=${sessionCookie}`, ...config.headers },
  };

  return instance.get<ResponseType>(url, {
    ...defaultConfig,
    ...config,
  });
};

export const post = (
  url: string,
  sessionCookie: string,
  body: object | string
) => {
  const defaultConfig = {
    headers: { Cookie: `connect.sid=${sessionCookie}` },
  };

  return instance.post(url, body, defaultConfig);
};

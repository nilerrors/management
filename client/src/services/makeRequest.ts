import axios from "axios";

import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export function get(url: string, params?: any, token?: string) {
  let headers = token == undefined ? {} : { Authorization: `Bearer ${token}` };
  return api(url, {
    method: "get",
    params,
    headers,
  })
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.message ?? "Error"));
}

export function post(url: string, data?: any, token?: string) {
  let headers = token == undefined ? {} : { Authorization: `Bearer ${token}` };
  return api(url, {
    method: "post",
    data,
    headers,
  })
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.data ?? "Error"));
}

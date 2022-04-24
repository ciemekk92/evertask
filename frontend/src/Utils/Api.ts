// @ts-ignore
import { param } from 'node-qs-serialization';

import { ApiResponse } from 'Types/Response';
import { customFetch } from './customFetch';
import { omitObjectsUndefinedFields } from './omitObjectsUndefinedFields';

type Params = Record<string, Unrestricted>;
type Payload = Record<Unrestricted, Unrestricted>;

const getUrlWithParams = (url: string, params: Params): string => {
  const stringParams = param(omitObjectsUndefinedFields(params));

  return stringParams ? `${url}?${stringParams}` : url;
};

const getRequestOptions = ({ body, method = 'POST', headers = {} }: RequestInit): RequestInit => ({
  method,
  body,
  headers
});

const getJsonRequestOptions = ({
  data,
  method = 'POST',
  hasCredentials
}: {
  data: Payload;
  method?: string;
  hasCredentials?: boolean;
}): RequestInit => {
  return getRequestOptions({
    body: JSON.stringify(data),
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: hasCredentials ? 'include' : 'omit'
  });
};

export const Api = {
  get: async <T extends ApiResponse>(url: string, params: Params = {}): Promise<T> =>
    customFetch(getUrlWithParams(url, params), {}),
  getFull: async <T extends ApiResponse>(url: string, params: Params = {}): Promise<T> =>
    customFetch(getUrlWithParams(url, params), {}),
  post: async (url: string, data: Payload = {}): Promise<Response> => {
    return customFetch(url, getJsonRequestOptions({ data, method: 'POST' }));
  },
  postWithCredentials: async (url: string, data: Payload = {}): Promise<Response> => {
    return customFetch(url, getJsonRequestOptions({ data, method: 'POST', hasCredentials: true }));
  },
  put: async (url: string, data: Payload = {}): Promise<Response> => {
    return customFetch(url, getJsonRequestOptions({ data, method: 'PUT' }));
  },
  delete: async (url: string, data: Payload = {}): Promise<Response> => {
    return customFetch(url, getJsonRequestOptions({ data, method: 'DELETE' }));
  }
};

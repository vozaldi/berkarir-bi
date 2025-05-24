import axios, { AxiosRequestConfig } from 'axios';
import { appConfig, isDev } from '../config';
import { useUserState } from '@/states/userState';
import { rootState } from '@/states/providers/RootStoreProvider';

/**
 * Build HTTP request that returs Promise of the response
 * 
 * @param {string} url URL path without baseurl
 * @param {AxiosRequestConfig} args Axios config arguments
 * @param {boolean} dataOnly Promise returns data only. Use false to return AxiosResponse in Promise
 * 
 * @returns {Promise<Object | AxiosResponse>}
 */
const httpService = async (url: string, args: AxiosRequestConfig = {}, dataOnly: boolean = true): Promise<any> => {
  const { data = {}, method, headers = {} } = args;
  const user = rootState?.user?.getState().user;
  const isExternal = url.indexOf('http') === 0;
  const methodLC = (method || 'get').toLowerCase();
  let domain = appConfig('API_URL');

  if (['get'].indexOf(methodLC) >= 0) {
    args.params = data;

    delete args.data;
  }

  const route = [domain, url.indexOf('/') === 0 ? url.slice(1) : url].join('/');
  const apiUrl = isExternal ? url : route;

  args.headers = {
    'x-api-key': appConfig('API_KEY') || '-',
    ...(!isDev ? {} : {
      'x-api-mode': 'debug',
    }),
    "Content-Type": "multipart/form-data",
    ...(methodLC === 'put' && {
      "Content-Type": "application/json",
    }),
    ...((methodLC === 'post' && !args.data) && {
      "Content-Type": "application/json",
    }),
    "Authorization": `Bearer ${appConfig('API_TOKEN')}`,
    ...(!!user?.token && {
      "Authorization": `Bearer ${user.token}`,
    }),
    ...headers,
  };

  const abortController = new AbortController();
  const abortTO = setTimeout(() => {
    abortController.abort();
  }, args.timeout || 1000 * 30);

  return axios({
    url: apiUrl,
    signal: abortController.signal,
    ...args
  }).then(response => {
    const { data } = response;

    if ('string' === typeof data) {
      try {
        JSON.parse(data);
      } catch (e) {
        return Promise.reject(response);
      }
    }

    clearTimeout(abortTO);

    if (!dataOnly) return Promise.resolve(response);

    return Promise.resolve(data);
  }).catch(({ response = {}, code, ...rest }) => {
    isDev && console.error("CATCH", apiUrl, response, code, rest);

    clearTimeout(abortTO);

    if (['ERR_CANCELED', 'ECONNABORTED'].indexOf(code) >= 0 && !args.signal) {
      return Promise.reject({ status: false, message: `Connection Timeout` });
    } else if (404 === response.status) {
      return Promise.reject({ status: false, message: `Not Found` });
    }

    return Promise.reject({
      aborted: ['ERR_CANCELED', 'ECONNABORTED'].indexOf(code) >= 0,
      axios_code: code,
      ...(response.data || {}),
    });
  });
};

httpService.self = async (url: string, args?: AxiosRequestConfig) => {
  const nextUrl = appConfig('NEXT_URL') + url;

  return httpService(nextUrl, {
    withCredentials: true,
    ...args,
  }, false).then((data) => data?.data);
};

export default httpService;

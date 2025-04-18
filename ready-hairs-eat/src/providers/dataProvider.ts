import type { AxiosInstance } from 'axios';
import {
  axiosInstance,
  generateSort,
  generateFilter,
} from '@refinedev/simple-rest';
import type { DataProvider } from '@refinedev/core';
import { stringify } from 'query-string';

type MethodTypes = 'get' | 'delete' | 'head' | 'options';
type MethodTypesWithBody = 'post' | 'put' | 'patch';

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<
  Required<DataProvider>,
  'createMany' | 'updateMany' | 'deleteMany' | 'getMany'
> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const apiResource = resource;
    const url = `${apiUrl}/${apiResource}`;

    const { current = 1, pageSize = 10, mode = 'server' } = pagination ?? {};

    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? 'get';

    const queryFilters = generateFilter(filters);

    const query: {
      select?: number;
      skip?: number;
      _sort?: string;
      _order?: string;
    } = {};

    if (mode === 'server') {
      query.skip = (current - 1) * pageSize;
      query.select = current * pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(',');
      query._order = _order.join(',');
    }

    const combinedQuery = { ...query, ...queryFilters };
    const urlWithQuery = Object.keys(combinedQuery).length
      ? `${url}?${stringify(combinedQuery)}`
      : url;

    const { data } = await httpClient[requestMethod](urlWithQuery, {
      headers: headersFromMeta,
    });

    return {
      data: data.data,
      total: data.data.length,
    };
  },

  // getMany: async ({ resource, ids, meta }) => {
  //   const apiResource = resource;
  //   const { headers, method } = meta ?? {};
  //   const requestMethod = (method as MethodTypes) ?? 'get';

  //   const { data } = await httpClient[requestMethod](
  //     `${apiUrl}/${apiResource}?${stringify({ id: ids })}`,
  //     { headers }
  //   );

  //   return {
  //     data,
  //   };
  // },

  create: async ({ resource, variables, meta }) => {
    const apiResource = resource;
    const url = `${apiUrl}/${apiResource}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? 'post';

    const { data } = await httpClient[requestMethod](url, variables, {
      headers,
    });

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const apiResource = resource;
    const url = `${apiUrl}/${apiResource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? 'put';

    const { data } = await httpClient[requestMethod](url, variables, {
      headers,
    });

    return {
      data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const apiResource = resource;
    const url = `${apiUrl}/${apiResource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? 'get';

    const { data } = await httpClient[requestMethod](url, {
      headers,
    });

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, meta }) => {
    try {
      const apiResource = resource;
      const url = `${apiUrl}/${apiResource}/${id}`;

      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypes) ?? 'delete';

      const { data } = await httpClient[requestMethod](url, {
        headers,
      });
      console.log(data);

      if (!data) {
        return {
          data: {},
          error: 'Data not found',
        };
      }

      return {
        data,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          data: {} as any,
          error: error.message,
        };
      }
      return {
        data: {} as any,
        error: 'Unknown error occurred',
      };
    }
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestUrl = `${url}?`;

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (sorters) {
      const sortQuery = generateSort(sorters);
      if (sortQuery) {
        const { _sort, _order } = sortQuery;
        const sortQueryString = stringify({
          _sort: _sort.join(','),
          _order: _order.join(','),
        });
        requestUrl = `${requestUrl}&${sortQueryString}`;
      }
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    if (headers) {
      httpClient.defaults.headers.common = {
        ...httpClient.defaults.headers.common,
        ...headers,
      };
    }

    let axiosResponse;
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await httpClient[method](url, payload);
        break;
      case 'delete':
        axiosResponse = await httpClient.delete(url, {
          data: payload,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl);
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});

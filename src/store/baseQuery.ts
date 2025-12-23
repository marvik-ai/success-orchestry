import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import config from '@/config';
import { getToken } from '@/pages/auth/helpers/token.helpers';
import { logout } from '@/store/slices/authSlice';

const baseQuery = (
  basePath: string = '',
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const fetchBase = fetchBaseQuery({
    baseUrl: `${config.baseApiUrl ?? ''}/${basePath}`,
    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('Accept', 'application/json');

      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const result = await fetchBase(args, api, extraOptions);

    if (result.error?.status === 401) {
      api.dispatch(logout());
    }

    return result;
  };
};

export default baseQuery;

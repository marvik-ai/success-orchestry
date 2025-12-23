import { createApi } from '@reduxjs/toolkit/query/react';

import { storeToken } from '@/pages/auth/helpers/token.helpers';
import baseQuery from '@/store/baseQuery';
import { setToken } from '@/store/slices/authSlice';
import { LoginPayload, LoginResponse } from '@/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery('auth'),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          storeToken(data.access_token);
          dispatch(setToken(data.access_token));
        } catch {
          // Swallow errors; caller handles UI state.
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;

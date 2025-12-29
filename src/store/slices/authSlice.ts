import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { removeToken } from '@/pages/auth/helpers/token.helpers';

export interface AuthState {
  user: Record<string, unknown> | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState['token']>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeToken();
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;

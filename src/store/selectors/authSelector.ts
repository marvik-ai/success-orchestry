import { RootState } from '@/store';

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectCurrentUserRoleId = (state: RootState) =>
  (state.auth.user as { roleId?: string | number } | null)?.roleId;

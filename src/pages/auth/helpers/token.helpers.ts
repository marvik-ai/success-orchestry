const AUTH_LOCAL_STORAGE_KEY = 'auth-key';

export const getToken = (): string | null => {
  if (!localStorage) {
    return null;
  }

  return localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
};

export const storeToken = (token: string) => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, token);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
  }
};

export const removeToken = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

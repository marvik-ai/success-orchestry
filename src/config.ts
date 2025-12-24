const config = {
  baseApiUrl: import.meta.env.VITE_APP_API_URL,
  isDev: import.meta.env.DEV,
  authEnabled: import.meta.env.VITE_AUTH_ENABLED === 'true',
};

export default config;

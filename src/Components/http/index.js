import axios from 'axios';

export const API_URL = 'https://rhino-api-dyq7j.ondigitalocean.app';

export const cleanToken = (value) =>
  value ? value.replace(/['"«»]/g, '') : null;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const newToken = cleanToken(localStorage.getItem('token'));

  if (newToken) {
    config.headers.Authorization = `Bearer ${newToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      const newToken = cleanToken(localStorage.getItem('token'));
      const newToken2 = cleanToken(localStorage.getItem('refreshToken'));

      originalRequest._isRetry = true;
      try {
        const response2 = await axios.post(
          `${API_URL}/Users/refresh-token`,
          {
            token: newToken,
            refreshToken: newToken2,
            udid: 'test67',
          },
          { withCredentials: true }
        );

        localStorage.setItem('token', response2.data.jwtToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('Не авторизован');
      }
    }
    throw error;
  }
);

export default $api;

import axios from 'axios';

export const API_URL = 'https://rhino-api-alquo.ondigitalocean.app';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const newToken = token.replace(/['"«»]/g, '');

  config.headers.Authorization = `Bearer ${newToken}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem('token');
    const newToken = token.replace(/['"«»]/g, '');

    const token2 = localStorage.getItem('refreshToken');
    const newToken2 = token2.replace(/['"«»]/g, '');

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        // const response = await axios.get(`${API_URL}/Users/refresh-token`, {
        //   withCredentials: true,
        // });

        const response2 = await axios.post(
          `${API_URL}/Users/refresh-token`,
          {
            token: newToken,
            //password,
            refreshToken: newToken2,
            udid: 'test67',
            //parentId: '',
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

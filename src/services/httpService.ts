import axios, { AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const app: AxiosInstance = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
});

app.interceptors.request.use(
    (config) => {
        const accessToken = cookies.get('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

app.interceptors.response.use(
    (res) => {
        // اگر توکن‌ها در پاسخ وجود داشته باشند، آن‌ها را در کوکی‌ها ذخیره کنید
        const { access_token, refresh_token } = res.data;
        if (access_token) {
            cookies.set('accessToken', access_token, { path: '/' });
        }
        if (refresh_token) {
            cookies.set('refreshToken', refresh_token, { path: '/' });
        }
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response && err.response.status === 401 && !originalConfig._retry) {
            const refreshToken = cookies.get('refreshToken');
            if (refreshToken) {
                originalConfig._retry = true;
                try {
                    const { data } = await axios.post(
                        `https://api.escuelajs.co/api/v1/auth/refresh-token`,
                        { refreshToken }
                    );
                    if (data) {
                        cookies.set('accessToken', data.access_token, { path: '/' });
                        originalConfig.headers['Authorization'] = `Bearer ${data.access_token}`;
                        return app(originalConfig);
                    }
                } catch (error) {
                    return Promise.reject(error);
                }
            }
        }
        return Promise.reject(err);
    }
);

interface HttpClient {
    get: AxiosInstance['get'];
    post: AxiosInstance['post'];
    delete: AxiosInstance['delete'];
    put: AxiosInstance['put'];
    patch: AxiosInstance['patch'];
}

const http: HttpClient = {
    get: app.get,
    post: app.post,
    delete: app.delete,
    put: app.put,
    patch: app.patch,
};

export default http;
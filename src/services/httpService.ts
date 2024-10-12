import axios, { AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';
import { UserAccount } from '../types/Auth';

const cookies = new Cookies();

const app: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

app.interceptors.request.use(
    (config) => {
        const accounts = JSON.parse(localStorage.getItem("AllEmailAccount") || "[]");
        const emailSelected = accounts.find((account: UserAccount) => account.selected == true)
        const accessToken = cookies.get(`access-token-${emailSelected?.email}`);
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

app.interceptors.response.use(
    (res) => {
        const accounts = JSON.parse(localStorage.getItem("AllEmailAccount") || "[]");
        const email = accounts[accounts.length - 1]?.email;
        // اگر توکن‌ها در پاسخ وجود داشته باشند، آن‌ها را در کوکی‌ها ذخیره کنید
        const { access_token, refresh_token } = res.data;
        if (access_token) {
            cookies.set(`access-token-${email}`, access_token, { path: '/' });
        }
        if (refresh_token) {
            cookies.set(`refresh-token-${email}`, refresh_token, { path: '/' });
        }
        return res;
    },
    async (err) => {
        const accounts = JSON.parse(localStorage.getItem("AllEmailAccount") || "[]");
        const emailSelected = accounts.find((account: UserAccount) => account.selected == true)?.email
        const originalConfig = err.config;
        if (err.response && err.response.status === 401 && !originalConfig._retry) {
            const refreshToken = cookies.get(`refresh-token-${emailSelected}`);
            if (refreshToken) {
                originalConfig._retry = true;
                try {
                    const { data } = await axios.post(
                        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
                        { refreshToken }
                    );
                    if (data) {
                        cookies.set(`access-token-${emailSelected}`, data.access_token, { path: '/' });
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
import axios, { AxiosInstance } from 'axios';

const app: AxiosInstance = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
});

app.interceptors.request.use((config) => {
    // افزودن کوکی به هدر درخواست
    config.headers['Cookie'] = 'login=your-cookie-value'; // جایگزین 'your-cookie-value' با مقدار واقعی کوکی شما
    return config;
}, (error) => {
    return Promise.reject(error);
});

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
    patch: app.patch
};

export default http;
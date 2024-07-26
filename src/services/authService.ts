import http from "./httpService";

type props = {
    email: string;
    password: string;
}

export function signInApi(data: props) {
    return http.post('/auth/login', data).then(({ data }) => data);
}

export function getAccessToken(refreshToken: string) {
    return http.post('/auth/refresh-token', { refreshToken }).then(({ data }) => data);
}
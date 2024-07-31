import { dataLoginType, dataSignUpType } from "../types/Auth";
import http from "./httpService";

export function signInApi(data: dataLoginType) {
    return http.post('/auth/login', data).then(({ data }) => data);
}

export function getAccessTokenApi(refreshToken: string) {
    return http.post('/auth/refresh-token', { refreshToken }).then(({ data }) => data);
}

export function signUpApi(data: dataSignUpType) {
    const dataUser = {...data , avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRjkqpwHZ52ZpaHWqVgMbjYd3mBtOuMSmLw&s"}
    return http.post('/users/', dataUser).then(({ data }) => data);
}

// export function uploadImageApi(data: dataSignUpType) {
//     const dataUser = {...data , avatar:"https://avatars.githubusercontent.com/u/124599?v=4"}
//     return http.post('/users/', dataUser).then(({ data }) => data);
// }

export function getProfileApi() {
    return http.get('/auth/profile').then(({ data }) => data);
}
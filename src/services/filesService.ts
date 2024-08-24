import http from "./httpService";

export function uploadFileApi(file: FormData) {
    return http.post(`/files/upload`, file).then(({ data }) => data);
}

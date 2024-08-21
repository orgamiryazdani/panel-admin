import http from "./httpService";
import { AxiosProgressEvent } from "axios";

export function uploadFileApi(file: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) {
    return http.post(`/files/upload`, file, {
        onUploadProgress,
    }).then(({ data }) => data);
}

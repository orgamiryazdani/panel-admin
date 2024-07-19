import http from "./httpService";

// get category api
export function getCategories() {
    return http.get('/categories').then(({ data }) => data);
}
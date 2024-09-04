import http from "./httpService";

// get category api
export function getCategories() {
    return http.get('/categories').then(({ data }) => data);
}

// get single category api
export function getSingleCategory(id: number) {
    return http.get(`/categories/${id}`).then(({ data }) => data);
}
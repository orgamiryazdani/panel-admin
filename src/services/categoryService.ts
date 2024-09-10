import { category } from "../types/Category";
import http from "./httpService";

// get category api
export function getCategories(limit: number) {
    return http.get(`/categories?limit=${limit}`).then(({ data }) => data);
}

// get single category api
export function getSingleCategory(id: number) {
    return http.get(`/categories/${id}`).then(({ data }) => data);
}

// delete category api
export function deleteCategory(id: number) {
    return http.delete(`/categories/${id}`).then(({ data }) => data);
}

// update category api
export function updateCategory({ id, name, image }: category) {
    return http.put(`/categories/${id}`, { name, image }).then(({ data }) => data);
}

// create category api
export function createCategory(data: { name: string, image: string }) {
    return http.post('/categories', data).then(({ data }) => data);
}
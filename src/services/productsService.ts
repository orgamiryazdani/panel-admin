import { queryStringType } from "../types/Product";
import http from "./httpService";

// get product api
export function getProducts({ title, offset, limit, price_min, price_max, categoryId }: queryStringType) {
    return http.get(`/products?title=${title}&categoryId=${categoryId}&price_min=${price_min}&price_max=${price_max}&offset=${offset}&limit=${limit}`).then(({ data }) => data);
}

// delete product api
export function deleteProduct(id: number) {
    return http.delete(`/products/${id}`).then(({ data }) => data);
}

// update product api
export function updateProduct(id: number, title: string, price: number) {
    return http.put(`/products/${id}`, { title, price }).then(({ data }) => data);
}

// get single product api
export function getSingleProduct(productActive: number) {
    return http.get(`/products/${productActive}`).then(({ data }) => data);
}
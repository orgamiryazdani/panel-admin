import { createProductType, queryStringType, UpdateDataType } from "../types/Product";
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
export function updateProduct({ id, title, price, description, images }: UpdateDataType) {
    return http.put(`/products/${id}`, { title, price, description, images }).then(({ data }) => data);
}

// get single product api
export function getSingleProduct(productActive: number) {
    return http.get(`/products/${productActive}`).then(({ data }) => data);
}

// create product api
export function createProduct(data: createProductType) {
    return http.post(`/products`, data).then(({ data }) => data);
}
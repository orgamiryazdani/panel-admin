import http from "./httpService";

// get product api
export function getProducts() {
    return http.get('/products').then(({ data }) => data);
}

// delete product api
export function deleteProduct(id: number) {
    return http.delete(`/products/${id}`).then(({ data }) => data);
}

// update product api
export function updateProduct(id: number, title: string, price: number) {
    return http.put(`/products/${id}`, { title, price }).then(({ data }) => data);
}
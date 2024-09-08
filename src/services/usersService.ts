import { UserType } from "../types/Auth";
import http from "./httpService";

// get users api
export function getUsers(limit: number) {
    return http.get(`/users?limit=${limit}`).then(({ data }) => data);
}

// delete user api
export function deleteUser(id: number) {
    return http.delete(`/users/${id}`).then(({ data }) => data);
}

// update user api
export function updateUser({ id, name, avatar, email, password, role }: UserType) {
    return http.put(`/users/${id}`, { name, avatar, email, password, role }).then(({ data }) => data);
}

// get single user api
export function getSingleUser(id: number) {
    return http.get(`/users/${id}`).then(({ data }) => data);
}
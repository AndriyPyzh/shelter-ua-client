import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + '/users';

export function register(user) {
    return http.post(apiEndpoint, {
        username: user.username,
        email: user.email,
        password: user.password
    });
}

export function getCurrentAccount() {
    return http.get(`${ apiEndpoint }/current`);
}

export function getByUsername(username) {
    return http.get(`${ apiEndpoint }/${ username }`);
}

export default {
    register,
    getCurrentAccount,
    getByUsername
};

import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + '/adverts';

export function getAdverts(searchParams = {}, page = 0, size = 9, sort = 'id') {
    return http.get(apiEndpoint, { params: { page, size, sort, ...searchParams } });
}

export function getById(id) {
    return http.get(`${ apiEndpoint + id }`);
}

export function getByAuthor() {
    return http.get(`${ apiEndpoint }/author`);
}


export function addAdvert(advert) {
    return http.post(`${ apiEndpoint }`, {
        ...advert
    });
}

export function updateApartment(apartment) {
    return http.put(`${ apiEndpoint }/${ apartment.id }`, {
        ...apartment
    });
}


export default {
    getAdverts,
    getById,
    getByAuthor,
    addAdvert,
    updateApartment
};

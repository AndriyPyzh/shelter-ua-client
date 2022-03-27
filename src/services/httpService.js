import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response
        && error.response.status >= 400
        && error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.error("An unexpected error occurrred.");
    }

    return Promise.reject(error);
});

function setToken(token) {
    if (token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${ token }`;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setToken
};

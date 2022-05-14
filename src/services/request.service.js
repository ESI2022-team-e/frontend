import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8081/api';

class RequestService {

    getAllRequests() {
        return axios.get(API_BASE_URL + '/requests', {headers: authHeader()});
    }
}

export default new RequestService();
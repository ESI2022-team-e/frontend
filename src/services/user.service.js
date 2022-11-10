import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/test';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + '/all');
    }

    getCustomerBoard() {
        return axios.get(API_URL + '/user', {headers: authHeader()});
    }

    getManagerBoard() {
        return axios.get(API_URL + '/manager', {headers: authHeader()});
    }
}

export default new UserService();
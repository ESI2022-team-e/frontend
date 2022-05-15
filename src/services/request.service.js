import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8081/api';

class RequestService {

    getAllRequests() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.roles.includes('ROLE_CUSTOMER'))
            return axios.get(API_BASE_URL + '/customers/' + user.id + '/requests', {headers: authHeader()});
        else
            return axios.get(API_BASE_URL + '/requests', {headers: authHeader()});
    }
}

export default new RequestService();
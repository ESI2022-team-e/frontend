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
    getAllCustomers(){
        return axios.get('http://localhost:8081/api' + '/customers',{headers: authHeader()})
    }
    getCustomer(customerId){
        return axios.get('http://localhost:8081/api' + `/customers/${customerId}`,{headers: authHeader()})
    }
}

export default new UserService();
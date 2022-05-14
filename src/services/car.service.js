import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

class CarService {
    getAllCars() {
        return axios.get(API_BASE_URL + '/cars');
    }
}

export default new CarService();
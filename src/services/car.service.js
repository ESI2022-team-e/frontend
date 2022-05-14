import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

class CarService {
    getAllCars() {
        return axios.get(API_BASE_URL + '/cars');
    }
    getCar(carId) {
        return axios.get(API_BASE_URL + '/cars/' + carId)
    }
}

export default new CarService();
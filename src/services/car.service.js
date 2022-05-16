import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8081/api';

class CarService {
    getAllCars() {
        return axios.get(API_BASE_URL + '/cars')
    }
    getCar(carId) {
        return axios.get(API_BASE_URL + '/cars/' + carId)
    }
    deleteCar(carId) {
        return axios.delete(API_BASE_URL + '/cars/' + carId, {headers: authHeader()})
    }
    updateCar(carId, updatedValues) {
        console.log(updatedValues)
        return axios({
            method: 'put',
            url: API_BASE_URL + '/cars/' + carId,
            headers: authHeader(), 
            data: { 
                'licence_plate': updatedValues.licence_plate,
                'daily_cost': updatedValues.daily_cost                
            }
        }) 
    }
}

export default new CarService();
import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8081/api';

class CarService {

    getAllCars(dates) {
        let add = ""
        // ?startTime=2022-05-08T20:25:59&endTime=2022-05-15T20:25:59
        if (dates !== undefined)
            if (dates.pickupDatetime !== undefined || dates.dropoffDatetime !== undefined)
                add = "?startTime=" + dates.pickupDatetime + "&endTime=" + dates.dropoffDatetime
        return axios.get(API_BASE_URL + '/cars' + add, {
            data: dates
        })
    }

    getCar(carId) {
        return axios.get(API_BASE_URL + '/cars/' + carId)
    }

    deleteCar(carId) {
        return axios.delete(API_BASE_URL + '/cars/' + carId, {headers: authHeader()})
    }

    updateCar(carId, updatedValues) {
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
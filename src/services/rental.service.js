import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8081/api';

class RentalService {

    getAllRentals() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.roles.includes('ROLE_CUSTOMER'))
            return axios.get(API_BASE_URL + '/customers/' + user.id + '/rentals', {headers: authHeader()});
        else
            return axios.get(API_BASE_URL + '/rentals', {headers: authHeader()});
    }

    getRentalsByCar(carId){
        return axios.get(
            API_BASE_URL +
            '/cars' + carId +
            '/rentals',
            {headers: authHeader()})
    }

    getRental(rentalId) {
        let user = JSON.parse(localStorage.getItem('user'));
        return axios.get(
            API_BASE_URL +
            '/customers/' + user.id +
            '/rentals/' + rentalId,
            {headers: authHeader()})
    }

    startRental(carId, rentalId) {
        return axios({
            method: 'put',
            url: API_BASE_URL +
                '/cars/' + carId +
                '/rentals/' + rentalId,
            headers: authHeader(),
            data: {
                status: 'CURRENT'
            }
        })
    }

    endRental(carId, rentalId) {
        return axios({
            method: 'put',
            url: API_BASE_URL +
                '/cars/' + carId +
                '/rentals/' + rentalId,
            headers: authHeader(),
            data: {
                status: 'DONE'
            }
        })
    }

    extendRental(carId, rentalId, pickupDatetime, dropoffDatetime) {
        return axios({
            method: 'put',
            url: API_BASE_URL +
                '/cars/' + carId +
                '/rentals/' + rentalId,
            headers: authHeader(),
            data: {
                pickupDatetime: pickupDatetime,
                dropoffDatetime: dropoffDatetime
            }
        })
    }

}

export default new RentalService();
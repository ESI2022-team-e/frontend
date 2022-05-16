import authHeader from './auth-header';
import axios from "axios"; // responsible for communicating with api
const http = axios.create({
  baseURL: "http://localhost:8081/api", 
  headers: authHeader()
});


class RentalService {

    getAllRentals() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.roles.includes('ROLE_CUSTOMER'))
            return http.get(`/customers/${user.id}/rentals`);
        else 
            return http.get('/rentals');
    }

    getRentalsByCar(carId){
        return http.get(
            `/cars/${carId}/rentals`)
    }

    getRental(rentalId) {
        let user = JSON.parse(localStorage.getItem('user'));
        let rental = http.get(`/customers/${user.id}/rentals/${rentalId}`);
        return rental
    }

    startRental(carId, rentalId) {
        return http.put(`/cars/${carId}/rentals/${rentalId}`,
        {data:{status: 'CURRENT'}})
    }

    endRental(carId, rentalId) {
         return http.put(`/cars/${carId}/rentals/${rentalId}`,
        {data:{status: 'DONE'}})
    }

    updateRental(carId, rentalId,rental) {
        return http.put(`/cars/${carId}/rentals/${rentalId}`,rental)
    }

    deleteRental(carId, rentalId){
        return http.delete(`/cars/${carId}/rentals/${rentalId}`)
    }

}

export default new RentalService();
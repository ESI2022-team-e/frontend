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

    getAllRequestsByCarId(carId) {
        return axios.get(API_BASE_URL + '/cars/' + carId + '/requests', {headers: authHeader()})
    }

    getRequestByCarId(carId, requestId) {
        return axios.get(API_BASE_URL + '/cars/' + carId + '/requests/' + requestId, {headers: authHeader()})
    }

    getRequestById(requestId) {
        return axios.get(API_BASE_URL + '/requests/' + requestId, {headers: authHeader()})
    }

    deleteRequest(carId, requestId) {
        return axios.delete(API_BASE_URL + '/cars/' + carId + '/requests/' + requestId, {headers: authHeader()})
    }

    updateRequest(request, requestId, carId) {
        return axios.put(API_BASE_URL + '/cars/' + carId + '/requests/' + requestId, {headers: authHeader(), data: {request}})
    }

    createRequest(carId, pickupdate, dropoffdate, pickuploc, dropoffloc) {
        return axios({
            method: 'post',
            url: API_BASE_URL +
                '/cars/' + carId +
                '/requests',
            headers: authHeader(),
            data: {
                pickupDatetime: pickupdate,
                dropoffDatetime: dropoffdate,
                pickupLocation: pickuploc,
                dropoffLocation: dropoffloc,
                status: 'PENDING'
            }
        })
    }

    acceptRequest(carId, requestId) {
        return axios({
            method: 'put',
            url: API_BASE_URL +
                '/cars/' + carId +
                '/requests/' + requestId,
            headers: authHeader(),
            data: {
                status: 'ACCEPTED'
            }
        })
    }

    rejectRequest(carId, requestId) {
        return axios({
            method: 'put',
            url: API_BASE_URL +
                '/cars/' + carId +
                '/requests/' + requestId,
            headers: authHeader(),
            data: {
                status: 'REJECTED'
            }
        })
    }

    cancelRequest(carId, requestId) {
        return axios({
            method: 'put',
            url: API_BASE_URL +
                '/cars/' + carId +
                '/requests/' + requestId,
            headers: authHeader(),
            data: {
                status: 'CANCELLED'
            }
        })
    }
}

export default new RequestService();
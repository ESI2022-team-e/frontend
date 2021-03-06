import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8081/api';

class InvoiceService {

    getAllInvoices() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.roles.includes('ROLE_CUSTOMER'))
            return axios.get(API_BASE_URL + '/customers/' + user.id + '/invoices', {headers: authHeader()});
        else
            return axios.get(API_BASE_URL + '/invoices', {headers: authHeader()});
    }

    getInvoice(invoiceId) {
        return axios.get(
            API_BASE_URL +
            '/invoices/' + invoiceId,
            {headers: authHeader()})
    }

    payInvoice(customerId, rentalId, invoiceId) {
        return axios({
            method: 'put',
            url: API_BASE_URL +
                '/customers/' + customerId +
                '/rentals/' + rentalId +
                '/invoices/' + invoiceId,
            headers: authHeader(),
            data: {
                status: 'PAID'
            }
        })
    }

}

export default new InvoiceService();
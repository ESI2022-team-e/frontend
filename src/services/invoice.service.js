import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8081/api/';

class InvoiceService {

    getAllInvoices() {
        return axios.get(API_BASE_URL + 'invoices', {headers: authHeader()});
    }

}

export default new InvoiceService();
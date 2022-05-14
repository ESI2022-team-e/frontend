<template>
  <div id="invoices">
    <h1>Invoices</h1>
  </div>

  <TableComponent
      :items='invoices'
      :headers='headers'
      :show-button=true
      :button-text='buttonText'
      :page='page'
  ></TableComponent>

</template>

<script>

import TableComponent from "@/components/TableComponent";
import InvoiceService from "@/services/invoice.service"

export default {
  name: 'InvoiceList',
  components: {
    TableComponent
  },

  data() {
    const headers = ["Nr", "Date", "Status", "Amount", "Rental", "Customer"]
    const invoices = null
    const buttonText = "Details"
    const page = "invoice"
    return {headers, invoices, buttonText, page}
  },

  methods: {
    getAllInvoices() {
      InvoiceService.getAllInvoices().then(
          (response) => {
            this.invoices = response.data;
            localStorage.setItem('invoices', response.data);
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
  },

  created() {
    this.getAllInvoices()
  }
}

</script>
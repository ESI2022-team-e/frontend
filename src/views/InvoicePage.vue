<template>
  <div id="invoice">
    <h1>Invoices</h1>
  </div>

  <TableComponent :items='invoices' :headers='headers'></TableComponent>

</template>

<script>

import TableComponent from "@/components/TableComponent";
import InvoiceService from "@/services/invoice.service"

export default {
  name: 'CustomerInvoice',
  components: {
    TableComponent
  },

  data() {
    const headers = ["Nr", "Date", "Status", "Amount", "Rental"]
    const invoices = null
    return {invoices, headers}
  },

  methods: {
    getAllInvoices() {
      InvoiceService.getAllInvoices().then(
          (response) => {
            this.invoices = response.data;
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
    }
  },

  created() {
    this.getAllInvoices()
  }
}

</script>
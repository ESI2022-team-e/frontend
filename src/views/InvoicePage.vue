<template>
  <div id="invoice">
    <h1>Invoice</h1>
  </div>
  <div>
    <VerticalTableComponent
        :item='invoice'
        :headers='headers'
        :key='invoice'
    ></VerticalTableComponent>
    <div class='container-with-padding'>
      <a class="btn btn-nav" role="button" href="/invoices">Back</a>
      <button :disabled="invoice.status === 'PAID'" :key='invoice.status' class="btn btn-primary"
              v-on:click='payInvoice'>Pay
      </button>
    </div>

  </div>
</template>

<script>

import InvoiceService from "@/services/invoice.service";
import VerticalTableComponent from "@/components/VerticalTableComponent";
import {notify} from "@kyvg/vue3-notification";

export default {
  name: 'InvoicePage',
  components: {
    VerticalTableComponent
  },

  data() {
    const invoiceId = this.$route.params.id
    const headers = {id: "Nr", date: "Date", status: "Status", price: "Amount", rental: "Rental", customer: "Customer"}
    const invoice = {status: 'PAID'}
    const notification = ""
    return {headers, invoiceId, invoice, notification}
  },

  methods: {
    getInvoice() {
      InvoiceService.getInvoice(this.invoiceId).then(
          (response) => {
            this.invoice = response.data;
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

    notifySuccess() {
      notify({
        text: this.notification,
        type: 'success',
      });
    },

    payInvoice() {
      InvoiceService.payInvoice(this.invoice.customer.id, this.invoice.rental.id, this.invoiceId).then(
          (response) => {
            this.notification = response.data;
            this.notifySuccess()
            this.getInvoice()
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
    this.getInvoice()
  },
}

</script>
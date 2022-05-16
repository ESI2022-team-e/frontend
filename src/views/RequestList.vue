<template>
  <div id="requests">
    <h1>Requests</h1>
  </div>

  <TableComponent
      :items='requests'
      :headers='headers'
      :show-button=true
      :button-text='buttonText'
      :page='page'>
  </TableComponent>
</template>

<script>

import TableComponent from "@/components/TableComponent";
import RequestService from "@/services/request.service"

export default {
  name: "RequestList",
  components: {
    TableComponent
  },
  data() {
    const headers = ["Id", "Pickup datetime", "Dropoff datetime", "Pickup location", "Dropoff location", "Status"]
    const requests = null
    const buttonText = "Details"
    const page = "requests"
    return {headers, requests, buttonText, page}
  },
  methods: {
    getAllRequests() {
      RequestService.getAllRequests().then(
          (response) => {
            console.log(response.data);
            this.requests = response.data;
            localStorage.setItem('requests', response.data);
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
    this.getAllRequests()
  }
}
</script>
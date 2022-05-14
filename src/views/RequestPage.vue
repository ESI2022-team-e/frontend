<template>
  <div id="requests">
    <h1>Requests</h1>
  </div>

  <TableComponent :items='requests' :headers='headers'></TableComponent>
</template>

<script>

import TableComponent from "@/components/TableComponent";
import RequestService from "@/services/request.service"

export default {
  name: "Requests",
  components: {
    TableComponent
  },
  data() {
    const headers = ["Id", "Pickup datetime", "Dropoff datetime", "Pickup location", "Dropoff location", "Status", "Car Id",
      "Customer Id"]
    const requests = null
    return {requests, headers}
  },
  methods: {
    getAllRequests() {
      RequestService.getAllRequests().then(
          (response) => {
            this.requests = response.data;
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

<style scoped>

</style>
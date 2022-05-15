<template>
  <div id="rentals">
    <h1>Rentals</h1>
  </div>

  <TableComponent
      :items='rentals'
      :headers='headers'
      :show-button=true
      :button-text='buttonText'
      :page='page'
  ></TableComponent>

</template>

<script>

import TableComponent from "@/components/TableComponent";
import RentalService from "@/services/rental.service"

export default {
  name: 'RentalList',
  components: {
    TableComponent
  },

  data() {
    const headers = ["Nr", "Pickup time", "Drop-off time","Pickup location", "Drop-off location", "Status"]
    const rentals = null
    const buttonText = "Details"
    const page = "rental"
    return {headers, rentals, buttonText, page}
  },

  methods: {
    getAllRentals() {
      RentalService.getAllRentals().then(
          (response) => {
            this.rentals = response.data;
            localStorage.setItem('rentals', response.data);
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
    this.getAllRentals()
  }
}

</script>
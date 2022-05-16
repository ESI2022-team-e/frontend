<template>
  <div id="rental">
    <h1>Rental</h1>
  </div>
  <div>
    <table>
      <tr v-for='(data, index) in rental' :key='index'>
        <th>{{ headers[index] }}</th>
        <td>{{ data }}</td>
      </tr>
    </table>
  </div>
  
</template>

<script>

import RentalService from "@/services/rental.service";
import {notify} from "@kyvg/vue3-notification";

export default {
  name: 'RentalPage',

  data() {
    const rentalId = this.$route.params.id
    const headers = {id: "Nr", pickupDatetime: "Pickup time", pickupLocation: "Pickup location", dropoffDatetime: "Drop-off time", dropoffLocation: "Drop-off location", car_id: "Car ID", status: "Status"}
    const rental = null
    const notification = ""
    return {headers, rentalId, rental, notification}
  },

  methods: {
    getRental() {
      RentalService.getRental(this.rentalId).then(
          console.log("getting rental " + this.rentalId),
          (response) => {
            this.rental = response.data;
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

    startRental() {
      RentalService.startRental(this.rental.car_id, this.rentalId).then(
          (response) => {
            this.notification = response.data;
            this.notifySuccess()
            this.getRental()
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

  endRental() {
      RentalService.endRental(this.rental.car_id, this.rentalId).then(
          (response) => {
            this.notification = response.data;
            this.notifySuccess()
            this.getRental()
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

     created () {
       this.getRental();
       console.log("new rental id " + this.rental.id)
    },

}

</script>
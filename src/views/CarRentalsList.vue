<template>
  <div id="carrentals">
    <h1>Rentals</h1>
  </div>

  <div class="list row">
    <div class="col-md-6">
      <h4>Rentals List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(rental, index) in rentals"
          :key="index"
          @click="setActiveRental(rental, index)"
        >
          Rental {{ index + 1 }}
        </li>
      </ul>
      <br/>
    </div>
    <div class="col-md-6">
      <div v-if="currentRental">

        <!-- Card -->
            <div class="card">
              <div class="card-header">
                <h5>Rental {{currentIndex + 1}}</h5>
              </div>
              <div class="card-body">
                  <h5>Pickup</h5>
                <p class="card-text"><i class="fa-solid fa-clock"></i> {{ formatDate(currentRental.pickupDatetime) }}</p>
                <p class="card-text"><i class="fa-solid fa-location-dot"></i> {{ currentRental.pickupLocation }}</p>
                <h5>Drop-off</h5>
                <p class="card-text"><i class="fa-solid fa-clock"></i> {{ formatDate(currentRental.dropoffDatetime) }}</p>
                <p class="card-text"><i class="fa-solid fa-location-dot"></i> {{ currentRental.dropoffLocation }}</p>
                <p class="card-text"><i class="fa-solid fa-tick"></i> Status: {{ currentRental.status }}</p>
                <button :disabled="currentRental.status != 'UPCOMING'" :key='currentRental.status' class="btn btn-primary" v-on:click="startRental">Start</button>
                <button :disabled="currentRental.status != 'CURRENT'" :key='currentRental.status' class="btn btn-primary" v-on:click="endRental">End</button>
                <button class="btn btn-danger" v-on:click="deleteRental">Delete</button>
                <!-- <router-link :to="{ name: 'rental', params: {id: currentRental.id} }" class="btn btn-warning">Update <i class="fa-solid fa-pencil"></i></router-link> -->
              </div>
            </div>
        <!-- /Card -->
      </div>
      <div v-else>
        <br />

        <div class="alert alert-info">Please click on a Rental...!</div>
      </div>
    </div>
  </div>

</template>

<script>

//import TableComponent from "@/components/TableComponent";
import RentalService from "@/services/rental.service"
import {notify} from "@kyvg/vue3-notification";
import moment from 'moment'

export default {
  name: 'RentalList',
//   components: {
//     TableComponent
//   },

  data() { return{
     rentals: [],
     currentIndex: 0,
     currentRental: null,
     notification: ""
  }
   
  },

  methods: {
    getRentalsByCar() {
      RentalService.getRentalsByCar(this.$route.params.car_id).then(
          response => {
            this.rentals = response.data;
            console.log(response.data);
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
    setActiveRental(rental, index) {
      this.currentRental = rental;
      this.currentIndex = rental ? index : -1;
    },

    formatDate(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY HH:mm')
        }
    },

    notifySuccess() {
      notify({
        text: this.notification,
        type: 'success',
      });
    },

    startRental() {
      RentalService.startRental(this.currentRental.car.id, this.currentRental.id).then(
          (response) => {
            this.notification = response.data;
            this.notifySuccess()
            window.location.reload();
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
    endRental() {
      RentalService.endRental(this.currentRental.car.id, this.currentRental.id).then(
          (response) => {
            this.notification = response.data;
            this.notifySuccess();
            window.location.reload();
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
    deleteRental(){
        RentalService.deleteRental(this.currentRental.car.id, this.currentRental.id).then(
          (response) => {
            this.notification = response.data;
            this.notifySuccess();
            window.location.reload();
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
    this.getRentalsByCar()
  }
}

</script>
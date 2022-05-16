<template>
  <div>
    <section class="main-container">
      <h1>Car Catalogue </h1>
      <div class="car-profile" v-for="car in cars" :key="car.id">
        <img alt="car_img" src="../assets/img/car-img.png">
        <h2> {{ car.mark }} <br>
          {{ car.model }}</h2>
        <div class="text">
          <p>Number of seats: {{ car.nr_of_seats }} <br>
            Transmission type: {{ car.transmission_type }} <br>
            Fuel type: {{ car.fuel_type }} <br>
            Daily cost: {{ car.daily_cost }} <br>
            Year: {{ car.year }} </p>
          <router-link class="select-button" role="button"
                       :to="{ name: 'car', params: {id: car.id} }">DETAILS
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import CarService from "@/services/car.service";

export default {
  name: 'CarsList',

  data() {
    const cars = null
    const requestEnabled = true
    return {cars, requestEnabled}
  },

  methods: {
    getAllCars() {
      CarService.getAllCars().then(
          (response) => {
            this.cars = response.data;
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
    this.getAllCars()
  }
}
</script>

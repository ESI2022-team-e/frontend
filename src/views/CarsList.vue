<template>
  <div>
    <section class="main-container">
      <h1>Car Catalogue </h1>

      <Form @submit="getAllCars">
        <div class="date-search">
          <div>
            <label for="pickupDatetime">Pickup date & time</label>
            <Field name="pickupDatetime" type="datetime-local" step=".10" min="{{this.minDatetime}}"
                   class="form-control"/>
            <ErrorMessage name="pickupDatetime" class="error-feedback"/>
          </div>
          <div>
            <label for="dropoffDatetime">Drop-off date & time</label>
            <Field name="dropoffDatetime" type="datetime-local" step=".10" min="{{this.minDatetime}}"
                   class="form-control"/>
            <ErrorMessage name="dropoffDatetime" class="error-feedback"/>
          </div>
          <div class="center">
            <button class="btn btn-primary btn-block">
              Search
            </button>
          </div>
        </div>
      </Form>

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
import {ErrorMessage, Field, Form} from "vee-validate";

export default {
  name: 'CarsList',

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const cars = null
    const requestEnabled = true
    return {cars, requestEnabled}
  },

  methods: {
    getAllCars(dates) {
      console.log(dates)
      CarService.getAllCars(dates).then(
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

  mounted() {
    this.getAllCars()
  }
}
</script>

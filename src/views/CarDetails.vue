<template>
  <div>
    <section class="main-container">
      <h1>Car details </h1>
        <img alt="car_img" src="../assets/img/images.jpg">
        <h2>Car {{ car.mark }} <br>
          {{ car.model }}</h2>
        <div class="text">
          <p>Number of seats: {{ car.nr_of_seats }} <br>
            Transmission type: {{ car.transmission_type }} <br>
            Fuel type: {{ car.fuel_type }} <br>
            Daily cost: {{ car.daily_cost }} <br>
            Year: {{ car.year }} </p>
        </div>
    </section>
  </div>
</template>

<script>

import CarService from "@/services/car.service";

export default {
  name: 'CarDetails',

  data() {
    const car = null
    return {car}
  },

  methods: { 
    getCar(){
      CarService.getCar().then(
        (response) => {
          console.log(response);
          this.car = response.data;
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
    this.getCar()
  }
}
</script>

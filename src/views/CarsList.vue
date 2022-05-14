<template>
  <div>
    <section class="main-container">
      <h1>Car Catalogue </h1>
      <div class="car-profile" v-for="car in cars" :key="car.id">
        <img alt="car img" src="src/assets/img/images.jpg">
        <h2>Car {{ car.mark }} <br>
          {{ car.model }}</h2>
        <div class="text">
          <p>Number of seats: {{ car.nr_of_seats }} <br>
            Transmission type: {{ car.transmission_type }} <br>
            Fuel type: {{ car.fuel_type }} <br>
            Daily cost: {{ car.daily_cost }} <br>
            Year: {{ car.year }} </p>
          <button class="select-button"> Select</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CarsList',
  data: function () {
    return {
      cars: []
    }
  }
}
</script>

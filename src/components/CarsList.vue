<template>
  <div>
    <section class="main-container">
      <h1>Car Catalogue </h1>
      <div class="car-profile" v-for="car in cars" :key="car.id">
        <img alt="car img" src="../assets/images.jpg">
        <h2>Car {{car.mark}} <br>
            {{car.model}}</h2>
        <div class="text">
          <p>Number of seats: {{car.nr_of_seats}} <br>
             Transmission type: {{car.transmission_type}} <br>
             Fuel type: {{car.fuel_type}} <br>
             Daily cost: {{car.daily_cost}} <br>
             Year: {{car.year}} </p>
          <button class="select-button"> Select </button>
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

<style>
  h1 {
    font-size: 45px;
    text-align: center;
    text-transform: uppercase;
    margin: 20px;
  }

  .car-profile {
    width: 100%;
    display: inline-block;
    border: 1px solid #111111;
    border-radius: 5px;
    text-align: center;
    margin: 10px;
  }

  .car-profile img {
    width: 40%;
    height: 40%;
    float: left;
    margin: 20px;
  }

  .car-profile h2 {
    font-size: 34px;
    margin: 20px;
  }

  .car-profile p {
    text-align: left;
    margin-left: 35px;
  }

  .car-profile .text {
    display: flex;
    justify-content: space-between;
  }

  .select-button {
    background-color: white;
    height: 55px;
    width: 190px;
    line-height: 10px;
    font-weight: bold;
    text-transform: uppercase;
    border: 5px solid #34d484;
    margin: 15px 35px 15px 15px;
  }

</style>
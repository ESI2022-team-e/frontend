<template>
  <div id="car">
      <h1>Car</h1>
  </div>
  <div>
    <VerticalTableComponent
        :item='car'
        :headers='headers'
        :key='car'
    ></VerticalTableComponent>
    <div class='container-with-padding'>
      <a class="btn btn-nav" role="button" href="/cars">Back</a>
    </div>
  </div>
</template>

<script>

import CarService from "@/services/car.service";
import VerticalTableComponent from "@/components/VerticalTableComponent";

export default {
  name: 'CarPage',
  components: {
    VerticalTableComponent
  },

  data() {
    const carId = this.$route.params.id
    const headers = {id: "Nr", daily_cost: "Daily cost", fuel_type: "Fuel type", licence_plate: "Licence plate", mark: "Mark", model: "Model", nr_of_seats: "No of seats", transmission_type: "Automatic", year: "Year" }
    const car = null
    return {carId, headers, car}
  },

  methods: { 
    getCar(){
      CarService.getCar(this.carId).then(
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

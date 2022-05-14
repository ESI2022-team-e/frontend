<template>
  <div id='car'>
    <h1>CAR CATALOGUE</h1>
  </div>
    <TableComponent :items='cars' :headers='headers'></TableComponent>
</template>

<script>

import TableComponent from "@/components/TableComponent";
import CarService from "@/services/car.service";

export default {
  name: 'CarsList',
  components:{
    TableComponent
  },

  data() {
    const headers = ["ID", "Mark", "Model", "Nr of seats", "Transmission type", "Fuel type", "Daily cost",  "Year", "Licence plate"]
    const cars = null
    return {cars, headers}
  },

  methods: { 
    getAllCars(){
      CarService.getAllCars().then(
        (response) => {
          console.log(response);
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

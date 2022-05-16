<template>
  <div id="car">
      <h1>Edit Car</h1>
  </div>
    <div>
    <VerticalTableComponent
        :item='car'
        :headers='headers'
        :key='car'
    ></VerticalTableComponent>
    </div>
    <br>
    <v-form @submit="updateCar">
            <div>
              <div class="form-group">
                <label for="licence_plate">Set new licence plate</label>
                <v-field name="licence_plate" type="text" class="form-control"/>
              </div>
              <div class="form-group">
                <label for="daily_cost">Set new daily cost</label>
                <v-field name="daily_cost" type="number" class="form-control"/>
              </div>
            </div>
    </v-form>
    <div class='container-with-padding'>
    <router-link class="btn btn-nav" role="button"
                       :to="{ name: 'cars'}">Back</router-link><div class="divider"/>
    <button v-if="isManager" class="btn btn-nav" role="button" v-on:click='updateCar'>Save changes</button>
    </div>
</template>

<script>

import CarService from "@/services/car.service";
import VerticalTableComponent from "@/components/VerticalTableComponent";
import {notify} from "@kyvg/vue3-notification";
import * as yup from "yup";

export default {
  name: 'EditCarPage',
  components: {
    VerticalTableComponent,
  },
  computed: {
      isManager () {
        return this.$store.state.auth.user.roles.includes("ROLE_MANAGER");
      }
  },
  props:{
    showButton:{
      type: Boolean,
    }
  },

  data() {
    const carId = this.$route.params.id
    const headers = {id: "Nr", daily_cost: "Daily cost", fuel_type: "Fuel type", licence_plate: "Licence plate", mark: "Mark", model: "Model", nr_of_seats: "No of seats", transmission_type: "Automatic", year: "Year" }
    const car = null
    const notification = ""
    const schema = yup.object().shape({
      licence_plate: yup.string(),
      daily_cost: yup.number(),
    });
    return {carId, headers, car, notification, schema, message:""}
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
    },

    notifySuccess() {
      notify({
        text: this.notification,
        type: 'success',
      });
    },

    updateCar(values){
        CarService.updateCar(this.carId, JSON.stringify(values, null, 2)).then(
        (response) => {
          this.message = response.data;
        },
        (error) => {
          this.content =
            (error.response && 
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(error);
        }
      );
    },
  },

  created() {
    this.getCar()
  }
}
</script>

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
  <Form @submit="updateCar">
    <div>
      <div class="form-group">
        <label for="licence_plate">New licence plate:</label>
        <input type="text" v-model="formData.licence_plate" class="form-input" name="licence_plate"/>
      </div>
      <div class="form-group">
        <label for="daily_cost">New daily cost:</label>
        <input type="number" v-model="formData.daily_cost" class="form-input" name="daily_cost"/>
      </div>
    </div>
    <input type="submit" v-if="isManager" class="btn btn-nav" value="Save changes"/>
  </Form>
  <div class='container-with-padding'>
    <router-link class="btn btn-nav" role="button"
                 :to="{ name: 'cars'}">Back
    </router-link>
    <div class="divider"/>
  </div>
</template>

<script>

import CarService from "@/services/car.service";
import VerticalTableComponent from "@/components/VerticalTableComponent";
import {notify} from "@kyvg/vue3-notification";
import {Form} from "vee-validate";

export default {
  name: 'EditCarPage',
  components: {
    VerticalTableComponent,
    Form,
  },
  computed: {
    isManager() {
      return this.$store.state.auth.user.roles.includes("ROLE_MANAGER");
    }
  },
  props: {
    showButton: {
      type: Boolean,
    }
  },

  data() {
    const carId = this.$route.params.id
    const headers = {
      id: "Nr",
      daily_cost: "Daily cost",
      fuel_type: "Fuel type",
      licence_plate: "Licence plate",
      mark: "Mark",
      model: "Model",
      nr_of_seats: "No of seats",
      transmission_type: "Automatic",
      year: "Year"
    }
    const car = null
    const notification = ""
    return {
      carId,
      headers,
      car,
      notification,
      formData: {
        licence_plate: null,
        daily_cost: null,
      }
    }
  },

  methods: {
    getCar() {
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

    updateCar() {
      if (this.formData.licence_plate === null || this.formData.licence_plate === "") {
        this.formData.licence_plate = this.car.licence_plate;
      }
      if (this.formData.daily_cost === null) {
        this.formData.daily_cost = this.car.daily_cost;
      }
      CarService.updateCar(this.carId, this.formData).then(
          (response) => {
            this.notification = response.data;
            this.getCar();
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

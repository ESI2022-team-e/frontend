<template>
  <div id="createCar">
    <h1>Create a Car</h1>
  </div>
  <Form v-if="isManager" @submit="addCar">
    <div>
      <div class="form-group">
        <label for="mark">Mark:</label>
        <input
          type="text"
          v-model="formData.mark"
          class="form-input"
          name="mark"
          required
        />
      </div>
      <div class="form-group">
        <label for="model">Model:</label>
        <input
          type="text"
          v-model="formData.model"
          class="form-input"
          name="model"
          required
        />
      </div>
      <div class="form-group">
        <label for="nr_of_seats">Number of seats:</label>
        <input
          type="text"
          v-model="formData.nr_of_seats"
          class="form-input"
          name="nr_of_seats"
          required
        />
      </div>
      <div class="form-group">
        <label for="transmission_type">Transmission type:</label>
        <input
          type="text"
          v-model="formData.transmission_type"
          class="form-input"
          name="transmission_type"
          required
        />
      </div>
      <div class="form-group">
        <label for="fuel_type">Fuel type:</label>
        <input
          type="text"
          v-model="formData.fuel_type"
          class="form-input"
          name="fuel_type"
          required
        />
      </div>
      <div class="form-group">
        <label for="daily_cost">Daily cost:</label>
        <input
          type="number"
          v-model="formData.daily_cost"
          class="form-input"
          name="daily_cost"
          required
        />
      </div>
      <div class="form-group">
        <label for="year">Year:</label>
        <input
          type="text"
          v-model="formData.year"
          class="form-input"
          name="year"
          required
        />
      </div>
      <div class="form-group">
        <label for="licence_plate">Licence plate:</label>
        <input
          type="text"
          v-model="formData.licence_plate"
          class="form-input"
          name="licence_plate"
          required
        />
      </div>
    </div>
    <input
      type="submit"
      v-if="isManager"
      class="btn btn-nav"
      value="Save changes"
    />
  </Form>
  <div class="container-with-padding">
    <router-link class="btn btn-nav" role="button" :to="{ name: 'cars' }"
      >Back</router-link
    >
    <div class="divider" />
  </div>
</template>
<script>

import { Form } from "vee-validate";
import CarService from "@/services/car.service";
import { notify } from "@kyvg/vue3-notification";

export default {
  name: "CreateCarPage",
  components: {
    Form,
  },
  computed: {
    isManager() {
      return this.$store.state.auth.user.roles.includes("ROLE_MANAGER");
    },
  },
  props: {
    showButton: {
      type: Boolean,
    },
  },

  data() {
    const notification = "";
    const car = null;
    return {
      car,
      notification,
      formData: {
        mark: null,
        model: null,
        nr_of_seats: null,
        transmission_type: null,
        fuel_type: null,
        daily_cost: null,
        year: null,
        licence_plate: null,
      },
    };
  },

  methods: {
    addCar() {
      if (
        this.formData.mark === null ||
        this.formData.model === null ||
        this.formData.nr_of_seats === null ||
        this.formData.transmission_type === null ||
        this.formData.fuel_type === null ||
        this.formData.daily_cost === null ||
        this.formData.year === null ||
        this.formData.licence_plate === null
      ) {
        this.content === "Values cannot be null";
      }
      CarService.addCar(this.formData).then(
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
        type: "success",
      });
    },
  },
};
</script>

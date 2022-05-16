<template>
  <div id="rental">
    <h1>Update rental</h1>
  </div>
  
  <div>
  <Form @submit="updateRental">
            <div v-if="!successful">
              <div class="form-group">
                <label for="pickupDatetime">Pickup date & time</label>
                <Field name="pickupDatetime" type="datetime-local" step=".10" min="{{this.minDatetime}}" class="form-control"/>
                <ErrorMessage name="pickupDatetime" class="error-feedback"/>
              </div>
              <div class="form-group">
                <label for="dropoffDatetime">Drop-off date & time</label>
                <Field name="dropoffDatetime" type="datetime-local" step=".10" min="{{this.minDatetime}}" class="form-control"/>
                <ErrorMessage name="dropoffDatetime" class="error-feedback"/>
              </div>
              <div class="form-group">
                <label for="pickupLocation">Pickup location</label>
                <Field name="pickupLocation" type="text" class="form-control"/>
                <ErrorMessage name="pickupLocation" class="error-feedback"/>
              </div>
              <div class="form-group">
                <label for="dropoffLocation">Drop-off location</label>
                <Field name="dropoffLocation" type="text" class="form-control"/>
                <ErrorMessage name="dropoffLocation" class="error-feedback"/>
              </div>

              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
              ></span>
                  Update
                </button>
              </div>
            </div>
          </Form>

          <div
              v-if="message"
              class="alert"
              :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
  
</template>

<script>

import RentalService from "@/services/rental.service";
import {notify} from "@kyvg/vue3-notification";
import {ErrorMessage, Field, Form} from "vee-validate";


export default {
  name: 'RentalPage',

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() { return{
    rentalId: this.$route.params.id,
    headers: {id: "Nr", pickupDatetime: "Pickup time", pickupLocation: "Pickup location", dropoffDatetime: "Drop-off time", dropoffLocation: "Drop-off location", car_id: "Car ID", status: "Status"},
    rental: null,
    message: "",
    minDatetime: null,
    loading: false,
    successful: false
    }
  },

  methods: {
    getRental() {
      RentalService.getRental(this.rentalId).then(
          response => {
            this.rental = response.data;
            console.log(response.data);
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

    setMinDatetime(){
        this.minDatetime = new Date(Date.now())
    },

    updateRental(rental) {
        this.message = "";
        this.successful = false;
        this.loading = true;
        console.log(rental);
        RentalService.updateRental(this.rental.car.id, this.rentalId,rental).then(
            (response) => {
                this.message = response.data;
                console.log(this.message);
                this.successful = true;
                this.loading = false;
                this.notifySuccess();
                this.getRental();
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
        text: this.message,
        type: 'success',
      });
    },

  },


     mounted () {
       this.getRental();
       this.setMinDatetime();
    },

}

</script>
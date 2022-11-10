<template>

  <section class="request-profile">
    <div id="add-request">
      <h4>Create rental request</h4>
    </div>

<!--<div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
    >{{ message }}
    </div>-->

    <div>
      <Form @submit="postRequest">
        <div v-if="!successful">

          <table class="request-table">
            <tr>
              <td><label>Car </label></td>
              <td><label>{{ carMarkModel }}</label></td>
            </tr>
            <tr>
              <td><label>Pickup date and time</label></td>
              <td><label>{{ pickupDatetime }}</label></td>
            </tr>
            <tr>
              <td><label>Drop-off date and time</label></td>
              <td><label>{{ dropoffDatetime }}</label></td>
            </tr>
          </table>

          <div class="flex-div">
            <label for="pickupLocation">Pickup location</label>
            <Field name="pickupLocation" type="text" class="form-control"/>
            <ErrorMessage name="pickupLocation" class="error-feedback"/>
          </div>

          <div class="flex-div">
            <label for="dropoffLocation">Drop-off location</label>
            <Field name="dropoffLocation" type="text" class="form-control"/>
            <ErrorMessage name="dropoffLocation" class="error-feedback"/>
          </div>

          <div class="flex-div">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
              ></span>
              Send request
            </button>
          </div>
        </div>
      </Form>
    </div>
  </section>

</template>

<script>
import {ErrorMessage, Field, Form} from "vee-validate";
import {notify} from "@kyvg/vue3-notification";
import RequestService from "@/services/request.service";
export default {
  name: 'SendRequestContainer',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    pickupDatetime: {},
    dropoffDatetime: {},
    pickupLocation: {},
    carMarkModel: {},
    carId: {},
  },
  data() {
    return {
      message: "Request sent successfully!",
      loading: false,
      successful: false
    }
  },
  methods: {
    postRequest() {
      RequestService.createRequest(this.carId, this.pickupDatetime, this.dropoffDatetime, this.pickupLocation, this.dropoffLocation).then(
          (response) => {
            this.message = response.data;
            this.successful = true;
            this.loading = false;
            this.notifySuccess();
            this.getRequest();
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
}
</script>
<template>
  <div id="request">
    <h1>Edit Request</h1>
  </div>
  <div>
    <VerticalTableComponent
        :item='request'
        :headers='headers'
        :key='request'
    ></VerticalTableComponent>
  </div>
  <br>
  <v-form @submit="updateRequest">
    <div>
      <div class="form-group">
        <label for="pickupDatetime">New pickup time:</label>
        <v-field name="pickupDatetime" type="text" class="form-control"/>
      </div>
      <div class="form-group">
        <label for="dropoffDatetime">New dropoff time:</label>
        <v-field name="dropoffDatetime" type="text" class="form-control"/>
      </div>
      <div class="form-group">
        <label for="dropoffLocation">New dropoff location:</label>
        <v-field name="dropoffLocation" type="text" class="form-control"/>
      </div>
    </div>
  </v-form>

  <div class='container-with-padding'>
    <router-link class="btn btn-nav" role="button"
                 :to="{ name: 'requests'}">Back</router-link><div class="divider"/>
    <button class="btn btn-nav" role="button" v-on:click='updateRequest'>Save changes</button>
  </div>
</template>

<script>

import RequestService from "@/services/request.service";
import VerticalTableComponent from "@/components/VerticalTableComponent";
import {notify} from "@kyvg/vue3-notification";
import * as yup from "yup";

export default {
  name: 'EditRequestPage',
  components: {
    VerticalTableComponent
  },
  computed: {
    isManager () {
      return this.$store.state.auth.user.roles.includes("ROLE_MANAGER");
    },
    isCustomer () {
      return this.$store.state.auth.user.roles.includes("ROLE_CUSTOMER");
    }
  },
  props:{
    showButton:{
      type: Boolean,
    }
  },

  data() {
    const requestId = this.$route.params.id
    const headers = ["Id", "Pickup datetime", "Dropoff datetime", "Pickup location", "Dropoff location", "Status", "Car Id", "Customer Id"]
    const request = null
    const notification = ""
    const schema = yup.object().shape({
      pickupDatetime: yup.date(),
      dropoffDatetime: yup.date(),
      dropoffLocation: yup.string(),
    })
    const message = ""
    return {requestId, headers, request, notification, schema, message}
  },

  methods: {
    getRequest(){
      RequestService.getRequest(this.requestId).then(
          (response) => {
            console.log(response);
            this.request = response.data;
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

    updateRequest(values){
      RequestService.updateRequest(this.request, JSON.stringify(values, null, 3)).then(
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
          }
      );
    },
  },

  created() {
    this.getRequest()
  }
}
</script>
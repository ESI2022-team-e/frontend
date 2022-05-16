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
  <p>Set a new pickup time:</p>
  <input placeholder="" />
  <br>
  <br>
  <p>Set a new dropoff time:</p>
  <input placeholder="" />
  <br>
  <br>
  <p>Set a new dropoff location:</p>
  <input placeholder="" />
  <br>
  <br>
  <template v-if="isManager">
    <p>Update status:</p>
    <input placeholder="" />
  </template>
  <br>
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
    return {requestId, headers, request, notification}
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

    updateRequest(){
      RequestService.updateRequest(this.request).then(
          (response) => {
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
  },

  created() {
    this.getRequest()
  }
}
</script>
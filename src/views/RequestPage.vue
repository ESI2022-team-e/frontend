<template>
  <div id="request">
    <h1>Request </h1>
  </div>
  <div>
    <VerticalTableComponent
        :item='request'
        :headers='headers'
        :key='request'
    ></VerticalTableComponent>
    <div class='container-with-padding'>
      <template v-if="isCustomer">
        <router-link class="btn btn-nav" role="button"
                     :to="{ name: 'requests'}">Back</router-link><div class="divider"/>
        <router-link class="btn btn-nav" role="button"
                     :to="{ name: 'editRequest', params: {id: request.id} }">Edit</router-link><div class="divider"/>
        <button class="btn btn-nav" role="button" v-on:click='deleteRequest'>Delete</button>
      </template>
    </div>
    <div class='container-with-padding'>
      <template v-if="isManager">
        <router-link class="btn btn-nav" role="button"
                   :to="{ name: 'requests'}">Back</router-link><div class="divider"/>
        <button class="btn btn-nav" role="button" v-on:click='acceptRequest'>Accept</button><div class="divider"/>
        <button class="btn btn-nav" role="button" v-on:click='rejectRequest'>Reject</button><div class="divider"/>
        <button class="btn btn-nav" role="button" v-on:click='cancelRequest'>Cancel</button>
      </template>
    </div>
  </div>
</template>

<script>

import RequestService from "@/services/request.service";
import VerticalTableComponent from "@/components/VerticalTableComponent";
import {notify} from "@kyvg/vue3-notification";

export default {
  name: 'RequestPage',
  components: {
    VerticalTableComponent
  },
  computed: {
    isManager () {
      return this.$store.state.auth.user.roles.includes("ROLE_MANAGER");
    },
    isCustomer() {
      return this.$store.state.auth.user.roles.includes("ROLE_CUSTOMER");
    }
  },
  props:{
    showButton:{
      type: Boolean,
    }
  },

  data() { return {
    requestId: this.$route.params.id,
    headers: ["Id", "Pickup datetime", "Drop-off datetime", "Pickup location", "Drop-off location", "Status"],
    request: null,
    message: "",
    minDatetime: null,
    }
  },

  methods: {
    getRequest(){
      RequestService.getRequestById(this.requestId).then(
          (response) => {
            console.log(response.data);
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

    deleteRequest() {
      RequestService.deleteRequest(this.request.car.id, this.requestId).then(
          (response)=>{
            this.notification = response.data;
            this.notifySuccess()
            this.$router.push("/requests");
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
    acceptRequest(){
      console.log(this.request.car.id);
      RequestService.acceptRequest(this.request.car.id, this.requestId).then(
          (response) => {
            this.notification = response.data;
            this.notifySuccess()
            this.getAllRequests()
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
    rejectRequest(){
      RequestService.rejectRequest(this.request.car.id, this.requestId).then(
          (response) => {
            this.notification = response.data;
            this.notifySuccess()
            this.getAllRequests()
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
    cancelRequest(){
      RequestService.cancelRequest(this.request.car.id, this.requestId).then(
          (response) => {
            this.notification = response.data;
            this.notifySuccess()
            this.getAllRequests()
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

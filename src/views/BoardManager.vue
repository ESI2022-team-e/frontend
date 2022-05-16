<template>
  <div class="container">
    <header class="jumbotron">
      <h1>{{ content }}</h1>
    </header>
  </div>

  <div class="list row">
    <div class="col-md-6">
      <h4>Customers</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(customer, index) in customers"
          :key="index"
          @click="setActiveCustomer(customer, index)"
        >
          Customer {{ customer.id }}
        </li>
      </ul>
      <br/>
    </div>
    <div class="col-md-6">
      <div v-if="currentCustomer">

        <!-- Card -->
            <div class="card">
              <div class="card-header">
                <h5>Customer {{currentCustomer.id}}</h5>
              </div>
              <div class="card-body">
                <p class="card-text"><i class="fa-solid fa-user-circle"></i> First name: {{ currentCustomer.firstName }}</p>
                <p class="card-text"><i class="fa-solid fa-user-circle"></i> Last name: {{ currentCustomer.lastName }}</p>
                <p class="card-text"><i class="fa-solid fa-envelope"></i> Email: {{ currentCustomer.email }}</p>
                <p class="card-text"><i class="fa-solid fa-calendar"></i> Date of birth: {{ currentCustomer.dateOfBirth }}</p>
                <!-- links to customer's stuff -->
                <!-- <router-link :to="{ name: 'rentals',params: {customer_id: currentCustomer.id} }" class="btn btn-primary">Rentals <i class="fa-solid fa-pencil"></i></router-link> -->
                <!-- <router-link :to="{ name: 'requests',params: {customer_id: currentCustomer.id} }" class="btn btn-primary">Requests <i class="fa-solid fa-pencil"></i></router-link> -->
                <!-- <router-link :to="{ name: 'invoices',params: {customer_id: currentCustomer.id} }" class="btn btn-primary">Invoices <i class="fa-solid fa-pencil"></i></router-link> -->
              </div>
            </div>
        <!-- /Card -->
      </div>
      <div v-else>
        <br />

        <div class="alert alert-info">Please click on a Customer.</div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "MyManager",
  data() {
    return {
      content: "",
      headers: {},
      customers: [],
      currentIndex: -1,
      currentCustomer: null,
      notification: ""
    };
  },

  methods:{
    getManagerBoard(){
      UserService.getManagerBoard().then(
        (response) => {
          this.content = response.data;
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

    getAllCustomers(){
      UserService.getAllCustomers().then(
        (response) => {
          this.customers = response.data;
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

    setActiveCustomer(customer, index) {
      console.log(customer);
      this.currentCustomer = customer;
      this.currentIndex = customer ? index : -1;
    },

  },
    
  mounted() {
    this.getManagerBoard();
    this.getAllCustomers();
  },
};
</script>
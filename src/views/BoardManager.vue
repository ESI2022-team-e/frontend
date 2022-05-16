<template>
  <div class="container">
    <header class="jumbotron">
      <h1>{{ content }}</h1>
    </header>
  </div>
  <div>
    <table>
      <thead>
      <tr>
        <th v-for="header in headers" :key='header'> {{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="customer in customers" :key='customer'>
        <td v-for="field in customer" :key='field'>{{ field }}</td>
      </tr>
      </tbody>
    </table>
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
      customers: []
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
    
  mounted() {
    this.getManagerBoard();
    this.getAllCustomers();
  },
};
</script>
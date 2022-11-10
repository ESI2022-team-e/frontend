<template>
  <div class="container">
    <header class="jumbotron">
      <h1>{{ content }}</h1>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "MyManager",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
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
};
</script>